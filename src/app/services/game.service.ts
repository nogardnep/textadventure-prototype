import { ConfigService } from './config.service';
import { GameController } from 'src/game/core/GameController';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SCENARIOS } from 'src/scenarios/scenarios';
import { Entity } from 'src/game/core/models/Entity';
import { Play, StoredPlay } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { Choice } from 'src/game/core/models/Choice';
import { Scenario } from 'src/game/core/models/Scenario';
import { InformComponent } from 'src/app/components/inform/inform.component';

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
    private configService: ConfigService
  ) {
    this.configService.load(); // TODO: move?

    GameController.init(
      {
        onLoad: () => {
          return this.loadLastPlay();
        },
        onInform: (paragraphs: Paragraph[], actions?: Choice[]) => {
          this.inform(paragraphs, actions);
        },
        onLoaded: (play: Play) => {
          this.play = play;
          this.emitPlay();
          this.setSelection(null);
        },
        onSave: (storedPlay: StoredPlay) => {
          this.savePlay(storedPlay);
        },
        onStart: () => {
          this.setSelection(null);
        },
      },
      SCENARIOS
    );

    // this.loadLastPlay().then(() => {
    // this.startNewPlay();
    // });
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

  savePlay(storedPlay: StoredPlay): void {
    this.storageService.set(PLAY_STORAGE_KEY, storedPlay);
  }

  loadLastPlay(): Promise<StoredPlay> {
    return new Promise((resolve, reject) => {
      this.storageService
        .get(PLAY_STORAGE_KEY)
        .then((storedPlay: StoredPlay) => {
          if (storedPlay) {
            resolve(storedPlay);
          } else {
            reject('no play found');
          }
        });
    });
  }
}
