import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { Play, StoredPlay } from 'src/game/core/models/Play';
import { Scenario } from 'src/game/core/models/Scenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { SCENARIOS } from 'src/scenarios/scenarios';
import { InformComponent } from '../modules/shared/components/inform/inform.component';
import { AudioService } from './audio.service';
import { ConfigService } from './config.service';
import { StorageService } from './storage.service';

const PLAY_STORAGE_KEY = 'play';
export const INTERFACE_ID = 'game1'; // TODO: temp

export type MessageWrapper = {
  paragraphs: Paragraph[];
  choices?: Choice[];
  read: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private selection: Entity;
  private play: Play;
  private messages: MessageWrapper[] = [];

  playSubject = new Subject<Play>();
  playerSubject = new Subject<Character>();
  selectionSubject = new Subject<Entity>();
  messagesSubject = new Subject<MessageWrapper[]>();

  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private router: Router,
    private configService: ConfigService,
    private audioService: AudioService
  ) {
    this.checkPlay();
    this.configService.load(); // TODO: move?
  }

  // TODO: temp
  getCurrentScenario(): Scenario {
    return SCENARIOS.theFortress;
  }

  async openPopup(paragraphs: Paragraph[], choices?: Choice[]) {
    const modal = await this.modalController.create({
      component: InformComponent,
      componentProps: {
        paragraphs,
        choices,
      },
      backdropDismiss: false,
    });
    return await modal.present();
  }

  checkPlay(): void {
    if (!this.play) {
      this.loadLastPlay().then(() => {});
    }
  }

  emitPlay(): void {
    this.playSubject.next(this.play);
  }

  getPlay(): Play {
    return this.play;
  }

  emitSelection(): void {
    this.selectionSubject.next(this.selection);
  }

  setSelection(selection: Entity): void {
    // this.selection = selection;
    // this.emitSelection();
    if (selection) {
      this.router.navigate(['game1/selection/' + selection.getId()]);
    }
  }

  addMessage(paragraphs: Paragraph[], choices?: Choice[]) {
    this.messages.push({
      paragraphs,
      choices,
      read: false,
    });

    this.emitMessages();
  }

  emitMessages() {
    this.messagesSubject.next(this.messages);
  }

  getSelection(): Entity {
    return this.selection;
  }

  savePlay(): void {
    this.storageService.set(PLAY_STORAGE_KEY, this.play.getStored());
  }

  private setPlay(play: Play): void {
    this.play = play;
    this.emitPlay();
    this.setSelection(null);
    this.audioService.stopAllSounds();
  }

  startNewPlay(scenario: Scenario): void {
    this.setPlay(this.createPlay(scenario));
    this.play.init();
    this.savePlay();
  }

  loadLastPlay(): Promise<Play> {
    return new Promise<Play>((resolve, reject) => {
      this.storageService
        .get(PLAY_STORAGE_KEY)
        .then((storedPlay: StoredPlay) => {
          if (storedPlay) {
            const play = this.createPlay(
              this.getScenario(storedPlay.scenarioId)
            );
            play.load(storedPlay);
            console.log(this.play);
            this.setPlay(play);
            resolve(this.play);
          } else {
            console.error('no play found');
            reject();
          }
        });
    });
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

  private createPlay(scenario: Scenario): Play {
    return new Play(scenario, {
      onSave: () => {
        this.savePlay();
      },
      onInform: (paragraphs: Paragraph[], actions?: Choice[]) => {
        this.addMessage(paragraphs, actions);
        this.router.navigate(['game1/messages']);
        // this.inform(paragraphs, actions);
      },
      onStartConversation: (interlocutor: Entity) => {},
      onUpdateDisplay: () => {
        this.emitPlay();
      },
    });
  }
}
