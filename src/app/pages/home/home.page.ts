import { Character } from '../../../game/models/entity/Character';
import { GameController } from '../../../game/GameController';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityId, Entity } from 'src/game/models/Entity';
import { Play } from 'src/game/models/Play';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  play: Play;
  // playerId: Entity;
  selectionId: EntityId;
  // player: Character;

  private playSubscription: Subscription;
  // private playerSubscription: Subscription;
  private selectionSubscription: Subscription;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
        } else {
          this.play = null;
        }
      }
    );

    // this.playerSubscription = this.gameService.playerSubject.subscribe(
    //   (player: Character) => {
    //     console.log(player);
    //     if (player) {
    //       this.player = player;
    //     }
    //   }
    // );

    this.selectionSubscription = this.gameService.selectionSubject.subscribe(
      (selection: Entity) => {
        if (selection) {
          this.selectionId = selection.getId();
        } else {
          this.selectionId = null;
        }
      }
    );

    this.gameService.emitPlay();
    // this.gameService.emitPlayer();
    this.gameService.emitSelection();
  }

  // getPlayerPosition(): EntityId {

  // }

  getPlayer(): Character {
    return GameController.getEntity(this.play.playerId) as Character;
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
    // this.playerSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();
  }

  onClickNew(): void {
    this.gameService.startNewPlay();
  }

  onClickLoad(): void {
    this.gameService.loadLastPlay();
  }

  onClickConfig(): void {
    this.router.navigate(['/config']);
  }
}
