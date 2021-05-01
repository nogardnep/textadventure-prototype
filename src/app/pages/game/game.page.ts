import { Narration } from './../../../game/models/Narration';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Entity, EntityId } from 'src/game/models/Entity';
import { Play } from 'src/game/models/Play';
import { Character } from 'src/game/models/entity/Character';
import { GameController } from 'src/game/GameController';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  play: Play;
  // playerId: Entity;
  selectionId: EntityId;
  // player: Character;

  private playSubscription: Subscription;
  // private playerSubscription: Subscription;
  private selectionSubscription: Subscription;

  constructor(private gameService: GameService, private router: Router) {
    this.gameService.loadLastPlay()
  }

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

  getNarration(): Narration {
    return GameController.getNarration();
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
    // this.playerSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();
  }

  onClickHome(): void {
    this.router.navigate(['/']);
  }

  onClickConfig(): void {
    this.router.navigate(['/config']);
  }

}
