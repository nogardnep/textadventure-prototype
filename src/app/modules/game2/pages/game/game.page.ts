import { GameController } from 'src/game/core/GameController';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Narration } from 'src/game/core/models/Narration';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {
  play: Play;

  private playSubscription: Subscription;

  constructor(private gameService: GameService, private router: Router) {
    GameController.loadPlay();
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
  }
}
