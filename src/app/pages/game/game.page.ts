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
  selection: Entity;

  private playSubscription: Subscription;
  private selectionSubscription: Subscription;

  constructor(private gameService: GameService, private router: Router) {
    GameController.loadPlay();
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

    this.selectionSubscription = this.gameService.selectionSubject.subscribe(
      (selection: Entity) => {
        if (selection) {
          this.selection = selection;
        } else {
          this.selection = null;
        }
      }
    );

    this.gameService.emitPlay();
    this.gameService.emitSelection();
  }

  getPlayer(): Character {
    return GameController.getPlay().getPlayer() as Character;
  }

  getNarration(): Narration {
    return GameController.getPlay().getNarration();
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();
  }

  onClickHome(): void {
    this.router.navigate(['/']);
  }

  onClickConfig(): void {
    this.router.navigate(['/config']);
  }

}
