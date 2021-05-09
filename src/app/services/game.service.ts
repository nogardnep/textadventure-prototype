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

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private selection: Entity;
  private play: Play;

  playSubject = new Subject<Play>();
  playerSubject = new Subject<Character>();
  selectionSubject = new Subject<Entity>();

  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private router: Router,
    private configService: ConfigService,
    private audioService: AudioService
  ) {
    this.configService.load(); // TODO: move?
  }

  // TODO: temp
  getCurrentScenario(): Scenario {
    return SCENARIOS['test'];
  }

  async inform(paragraphs: Paragraph[], actions?: Choice[]) {
    const modal = await this.modalController.create({
      component: InformComponent,
      componentProps: {
        paragraphs,
        actions,
      },
    });
    return await modal.present();
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
    this.selection = selection;
    this.emitSelection();
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

  loadLastPlay(): void {
    this.storageService.get(PLAY_STORAGE_KEY).then((storedPlay: StoredPlay) => {
      if (storedPlay) {
        this.setPlay(this.createPlay(SCENARIOS[storedPlay.scenarioId]));
        this.play.load(storedPlay);
      } else {
        console.error('no play found');
      }
    });
  }

  private createPlay(scenario: Scenario): Play {
    return new Play(scenario, {
      onSave: () => {
        this.savePlay();
      },
      onInform: (paragraphs: Paragraph[], actions?: Choice[]) => {
        this.inform(paragraphs, actions);
      },
      onStartConversation: (interlocutor: Entity) => {
      },
    });
  }
}
