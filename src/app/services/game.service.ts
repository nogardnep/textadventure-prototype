import { ActionPattern } from 'src/game/core/models/Action';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Audio } from 'src/game/core/models/Audio';
import { Entity } from 'src/game/core/models/Entity';
import { Message } from 'src/game/core/models/Message';
import { Paragraph, ParagraphTag } from 'src/game/core/models/Paragraph';
import { EndMode, Play, StoredPlay } from 'src/game/core/models/Play';
import { BasePlay } from 'src/game/modules/base/BasePlay';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { SCENARIOS } from 'src/scenarios/scenarios';
import { AudioLayerKey, AudioService } from './audio.service';
import { ConfigService } from './config.service';
import { DisplayMode, InterfaceService } from './interface.service';
import { StorageService } from './storage.service';
import { Choice } from 'src/game/core/models/Choice';

const PLAY_STORAGE_KEY = 'play';

export enum GameKey {
  TheFortress = 'theFortress',
  TheGarden = 'theGarden',
}

export type MessageWrapper = {
  message: Message;
  read: boolean;
};

export enum StreamType {
  Entity = 'entity',
  Message = 'message',
}

export type StreamItem = {
  object: {};
  type: StreamType;
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private play: BasePlay;
  private messages: MessageWrapper[] = [];
  private lastLocation: MaterialEntity;
  private stream: StreamItem[] = [];

  playSubject = new Subject<BasePlay>();
  playerSubject = new Subject<Character>();
  messagesSubject = new Subject<MessageWrapper[]>();
  streamSubject = new Subject<StreamItem[]>();
  updateEvent = new EventEmitter();

  constructor(
    private storageService: StorageService,
    private configService: ConfigService,
    private interfaceService: InterfaceService,
    private audioService: AudioService
  ) {
    this.configService.load(); // TODO: move?
  }

  private getStorageKey(): string {
    return this.interfaceService.getGameKey() + '_' + PLAY_STORAGE_KEY;
  }

  // TODO: temp
  getCurrentScenario(): BaseScenario {
    let scenario: BaseScenario;
    console.log(this.interfaceService.getGameKey());

    switch (this.interfaceService.getGameKey()) {
      case GameKey.TheFortress:
        scenario = SCENARIOS.theFortress;
        break;
      case GameKey.TheGarden:
        scenario = SCENARIOS.theGarden;
        break;
    }

    return scenario;
  }

  checkPlay(): void {
    if (!this.play) {
      this.getStoredPlay().then((stored) => {
        if (stored) {
          this.loadPlay(stored);
        }
      });
    }
  }

  emitStream(): void {
    this.streamSubject.next(this.stream);
  }

  addToStream(item: StreamItem): void {
    this.stream.push(item);
    this.emitStream();
  }

  clearStream(): void {
    this.stream = [];
    this.emitStream();
  }

  emitPlay(): void {
    this.playSubject.next(this.play);
  }

  getPlay(): BasePlay {
    return this.play;
  }

  addMessage(message: Message) {
    this.messages.push({
      message,
      read: false,
    });

    this.emitMessages();
  }

  emitMessages() {
    this.messagesSubject.next(this.messages);
  }

  savePlay(): void {
    this.storageService.set(this.getStorageKey(), this.play.getStored());
  }

  setPlay(play: BasePlay): void {
    this.lastLocation = null;
    this.clearStream();
    console.log('setPlay');

    this.audioService.load(play.getScenario().getAudios(), () => {
      this.play = play;
      this.emitPlay();
      this.interfaceService.setSelection(null);
      this.audioService.stopAllSounds();
      this.onLocationUpdated();
    });
  }

  getStoredPlay(): Promise<StoredPlay> {
    return new Promise<StoredPlay>((resolve, reject) => {
      this.storageService.get(this.getStorageKey()).then((storedPlay) => {
        resolve(storedPlay);
      });
    });
  }

  createPlay(scenario: BaseScenario): BasePlay {
    return new BasePlay(scenario, {
      onAutoSave: () => {
        // TODO: move condition?
        if (this.play) {
          this.savePlay();
        }
      },
      onMessageSend: (message: Message) => {
        this.sendMessage(message);
      },
      onStartConversation: (interlocutor: Entity) => {
        this.interfaceService.goToConversation(interlocutor.getId());
      },
      onUpdate: () => {
        this.updateEvent.emit('updated');
      },
      onPlayMusic: (audio: Audio) => {
        this.audioService.clearLayer(AudioLayerKey.Music);
        this.audioService.play(audio, AudioLayerKey.Music, {
          fadeOut: 1000,
        });
      },
      onPlaySoundEffect: (audio: Audio) => {
        this.audioService.play(audio, AudioLayerKey.BriefEffects);
      },
      onEnd: (mode: EndMode, paragraphs: Paragraph[]) => {
        this.sendMessage({
          paragraphs,
          onRead: () => {
            this.interfaceService.goToHome();
          },
        });
      },
      onLookingAt: (author: Character, target: BaseEntity) => {
        if (author.isThePlayer()) {
          switch (this.interfaceService.getDisplayMode()) {
            case DisplayMode.Stream:
              this.addToStream({ type: StreamType.Entity, object: target });
              break;
            case DisplayMode.Simple:
              this.interfaceService.setSelection(target);
              break;
          }
        }
      },
      onMoving: (entity: MaterialEntity, destination: MaterialEntity) => {
        if (entity.getPlay().getPlayer() && entity.isThePlayer()) {
          this.onLocationUpdated();
        }
      },
      onSearchingForActionArg: (author: Entity, pattern: ActionPattern) => {
        return new Promise((resolve, reject) => {
          const choices: Choice[] = [];
          const things = pattern.getUsableThings(author);

          pattern.getUsableThings(author).forEach((thing) => {
            choices.push({
              text: thing.label,
              proceed: () => {
                resolve(thing.item);
              },
            });
          });
          choices.push({
            text: 'annuler',
            proceed: () => {
              reject();
            },
          });

          this.interfaceService.openPopup(
            [
              {
                tag: ParagraphTag.Information,
                text:
                  things.length > 0
                    ? pattern.getSearchText()
                    : pattern.getEmptyText(),
              },
            ],
            choices
          );
        });
      },
    });
  }

  sendMessage(message: Message): void {
    this.addToStream({ type: StreamType.Message, object: message });
    this.addMessage(message);

    if (this.interfaceService.getDisplayMode() !== DisplayMode.Stream) {
      this.interfaceService.goToMessages();
    }
  }

  onLocationUpdated(): void {
    if (this.play) {
      const newLocation = (this.play.getPlayer() as Character).getParent();
      // this.clearStream();
      this.addToStream({ type: StreamType.Entity, object: newLocation });

      // if (
      //   !this.lastLocation ||
      //   (newLocation && !newLocation.equals(this.lastLocation))
      // ) {
      this.lastLocation = (this.play.getPlayer() as Character).getParent();

      if (this.lastLocation) {
        this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);

        this.lastLocation.getAudioAmbiance().forEach((ambiance) => {
          if (!ambiance.check || ambiance.check()) {
            this.audioService.play(
              ambiance.audio,
              AudioLayerKey.LocationAmbiance,
              {
                loop: true,
                fadeIn: 1000,
                fadeOut: 1000,
                volume: ambiance.volume ? ambiance.volume : 1,
              }
            );
          }
        });
      }
      // }
    }
  }

  private loadPlay(storedPlay: StoredPlay): Play {
    const play = this.createPlay(this.getScenario(storedPlay.scenarioId));
    play.load(storedPlay);
    this.setPlay(play);
    return play;
  }

  private getScenario(id: string): BaseScenario {
    let found: BaseScenario;

    for (let key in SCENARIOS) {
      if (SCENARIOS[key].id === id) {
        found = SCENARIOS[key];
      }
    }

    if (!found) {
      console.error('Unfound scenario (' + id + ')');
    }

    return found;
  }
}
