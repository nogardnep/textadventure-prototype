import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Audio } from 'src/game/core/models/Audio';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { EndMode, Play, StoredPlay } from 'src/game/core/models/Play';
import { Scenario } from 'src/game/core/models/Scenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { SCENARIOS } from 'src/scenarios/scenarios';
import { AudioLayerKey, AudioService } from './audio.service';
import { ConfigService } from './config.service';
import { InterfaceService } from './interface.service';
import { StorageService } from './storage.service';

const PLAY_STORAGE_KEY = 'play';

export type MessageWrapper = {
  paragraphs: Paragraph[];
  choices?: Choice[];
  onRead?: () => void;
  read: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private play: Play;
  private messages: MessageWrapper[] = [];
  private location: MaterialEntity;

  playSubject = new Subject<Play>();
  playerSubject = new Subject<Character>();
  messagesSubject = new Subject<MessageWrapper[]>();

  constructor(
    private storageService: StorageService,
    private configService: ConfigService,
    private interfaceService: InterfaceService,
    private audioService: AudioService
  ) {
    this.configService.load(); // TODO: move?
  }

  // TODO: temp
  getCurrentScenario(): Scenario {
    return SCENARIOS.theFortress;
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

  emitPlay(): void {
    this.playSubject.next(this.play);
  }

  getPlay(): Play {
    return this.play;
  }

  addMessage(paragraphs: Paragraph[], choices?: Choice[], onRead?: () => void) {
    this.messages.push({
      paragraphs,
      choices,
      read: false,
      onRead: onRead,
    });

    this.emitMessages();
  }

  emitMessages() {
    this.messagesSubject.next(this.messages);
  }

  savePlay(): void {
    this.storageService.set(PLAY_STORAGE_KEY, this.play.getStored());
  }

  setPlay(play: Play): void {
    this.audioService.load(play.getScenario().audios, () => {
      this.play = play;
      this.emitPlay();
      this.interfaceService.setSelection(null);
      this.updateAudioAmbiance();
      this.audioService.stopAllSounds();
    });
  }

  getStoredPlay(): Promise<StoredPlay> {
    return new Promise<StoredPlay>((resolve, reject) => {
      this.storageService.get(PLAY_STORAGE_KEY).then((storedPlay) => {
        resolve(storedPlay);
      });
    });
  }

  createPlay(scenario: Scenario): Play {
    return new Play(scenario, {
      onAutoSave: () => {
        // TODO: move condition?
        if (this.play) {
          this.savePlay();
        }
      },
      onMessageSend: (
        paragraphs: Paragraph[],
        choices?: Choice[],
        onRead?: () => void
      ) => {
        this.sendMessage(paragraphs, choices, onRead);
      },
      onStartConversation: (interlocutor: Entity) => {
        this.interfaceService.goToConversation(interlocutor.getId());
      },
      onUpdate: () => {
        this.emitPlay();
        this.updateAudioAmbiance();
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
        this.sendMessage(paragraphs, [], () => {
          this.interfaceService.goToHome();
        });
      },
    });
  }

  sendMessage(
    paragraphs: Paragraph[],
    choices?: Choice[],
    onRead?: () => void
  ): void {
    this.addMessage(paragraphs, choices, onRead);
    this.interfaceService.goToMessages();
  }

  updateAudioAmbiance(): void {
    if (this.play) {
      const newLocation = (this.play.getPlayer() as Character).getParent();

      if (
        !this.location ||
        (newLocation && !newLocation.equals(this.location))
      ) {
        this.location = (this.play.getPlayer() as Character).getParent();

        if (this.location) {
          this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);

          this.location.getAudioAmbiance().forEach((ambiance) => {
            if (!ambiance.check || ambiance.check()) {
              this.audioService.play(
                ambiance.audio,
                AudioLayerKey.LocationAmbiance,
                {
                  loop: true,
                  // fadeIn: 1000,
                  // fadeOut: 1000,
                  volume: ambiance.volume ? ambiance.volume : 1,
                }
              );
            }
          });
        }
      }
    }
  }

  private loadPlay(storedPlay: StoredPlay): Play {
    const play = this.createPlay(this.getScenario(storedPlay.scenarioId));
    play.load(storedPlay);
    this.setPlay(play);
    return play;
  }

  private getScenario(id: string) {
    let found: Scenario;

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
