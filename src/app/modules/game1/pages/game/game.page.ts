import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { GameController } from 'src/game/core/GameController';
import { Entity } from 'src/game/core/models/Entity';
import { Narration } from 'src/game/core/models/Narration';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

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
    gameService.loadLastPlay();
    // GameController.startNewPlay(this.gameService.getCurrentScenario())
    // GameController.getPlay().getScenario().start()
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
    return this.play.getPlayer() as Character;
  }

  // TODO: move
  getLocation(): MaterialEntity {
    return (this.play.getPlayer() as MaterialEntity).getParent();
  }

  getNarration(): Narration {
    return this.play.getNarration();
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
