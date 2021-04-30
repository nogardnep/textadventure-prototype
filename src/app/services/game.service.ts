import { Router } from '@angular/router';
import { InformComponent } from './../components/inform/inform.component';
import { ModalController } from '@ionic/angular';
import { Action } from './../../game/models/Action';
import { Paragraph } from './../../game/models/Paragraph';
import { Character } from './../../game/models/entity/Character';
import { Play } from '../../game/models/Play';
import { StorageService } from './storage.service';
import { GameController } from './../../game/GameController';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entity, EntityId } from 'src/game/models/Entity';

const PLAY_STORAGE_KEY = 'play';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private selection: Entity;

  playSubject = new Subject<Play>();
  playerSubject = new Subject<Character>();
  selectionSubject = new Subject<Entity>();

  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private router: Router,
  ) {
    GameController.init(this);

    this.loadLastPlay().then(() => {
      // this.startNewPlay();
    });
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
    this.playSubject.next(GameController.getPlay());
  }

  emitPlayer(): void {
    this.playerSubject.next(GameController.getPlayer());
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
    this.storageService.set(PLAY_STORAGE_KEY, GameController.getPlay());
  }

  startNewPlay(): Promise<Play> {
    this.setSelection(null);

    this.router.navigate(['new-play'])

    return new Promise((resolve, reject) => {
    //   GameController.startNewPlay();
    //   resolve(GameController.getPlay());
    });
  }

  loadLastPlay(): Promise<Play> {
    return new Promise((resolve, reject) => {
      this.storageService.get(PLAY_STORAGE_KEY).then((playData: {}) => {
        if (playData) {
          const play = Object.assign(new Play(), playData);
          GameController.setPlay(play);
          resolve(play);
        } else {
          GameController.setPlay(null);
          console.error('no play found');
          reject();
        }
      });
    });
  }
}
