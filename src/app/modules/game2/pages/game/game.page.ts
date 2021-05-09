import { GameController } from 'src/game/core/GameController';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Narration } from 'src/game/core/models/Narration';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
  play: Play;

  private playSubscription: Subscription;

  constructor(private gameService: GameService, private router: Router) {
    this.gameService.loadLastPlay();
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
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
  }

  getPlayer(): Character {
    return this.play.getPlayer() as Character;
  }

  getNarration(): Narration {
    return this.play.getNarration();
  }
}
