import { ConfigService } from './config.service';
import { GameController } from 'src/game/GameController';
import { Play } from './../../game/models/Play';
import { Player } from './../../scenari/models/characters/Player';
import { Router } from '@angular/router';
import { InformComponent } from './../components/inform/inform.component';
import { ModalController } from '@ionic/angular';
import { Action } from './../../game/models/Action';
import { Paragraph } from './../../game/models/Paragraph';
import { Character } from './../../game/models/entity/Character';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entity, EntityId } from 'src/game/models/Entity';

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
    this.configService.load();

    GameController.init({
      onInform: (paragraphs: Paragraph[], actions?: Action[]) => {
        this.inform(paragraphs, actions);
      },
      onLoaded: (play: Play) => {
        this.play = play;
        this.emitPlay();
      },
      onSave: (play: Play) => {
        this.savePlay(play);
      },
      onStart: () => {},
    });

    // this.loadLastPlay().then(() => {
    // this.startNewPlay();
    // });
  }

  async inform(paragraphs: Paragraph[], actions?: Action[]) {
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
    // this.playSubject.next(GameController.getPlay());
    this.playSubject.next(this.play);
  }

  getPlay(): Play {
    return this.play;
  }

  // emitPlayer(): void {
  //   this.playerSubject.next(GameController.getPlayer());
  // }

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

  savePlay(play: Play): void {
    this.storageService.set(PLAY_STORAGE_KEY, play);
  }

  startNewPlay(player: Player): Promise<Play> {
    this.setSelection(null);

    return new Promise((resolve, reject) => {
      GameController.startNewPlay(player);
      resolve(this.play);
      // resolve(GameController.getPlay());
    });
  }

  loadLastPlay(): Promise<Play> {
    return new Promise((resolve, reject) => {
      this.storageService.get(PLAY_STORAGE_KEY).then((playData: {}) => {
        if (playData) {
          const play = Object.assign(new Play(), playData);
          GameController.loadPlay(play);
          // GameController.setPlay(play);
          resolve(play);
        } else {
          GameController.loadPlay(null);
          // GameController.setPlay(null);
          console.error('no play found');
          reject();
        }
      });
    });
  }
}
