import { ConfigService } from './config.service';
import { GameController } from 'src/game/GameController';
import { Play, StoredPlay } from './../../game/models/Play';
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
    this.configService.load(); // TODO: move?

    GameController.init({
      onLoad: () => {
        return this.loadLastPlay();
      },
      onInform: (paragraphs: Paragraph[], actions?: Action[]) => {
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

  savePlay(storedPlay: StoredPlay): void {
    this.storageService.set(PLAY_STORAGE_KEY, storedPlay);
  }

  // startNewPlay(player: Player): Promise<Play> {
  // this.setSelection(null);

  //   return new Promise((resolve, reject) => {
  //     GameController.startNewPlay(player);
  //     resolve(this.play);
  //   });
  // }

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
