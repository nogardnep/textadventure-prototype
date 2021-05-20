import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  GameService,
  INTERFACE_ID
} from 'src/app/services/game.service';
import { Narration } from 'src/game/core/models/Narration';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-game-page',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  play: Play;
  playerSelected: boolean = false;
  private playSubscription: Subscription;

  constructor(private gameService: GameService, private router: Router) {
    // gameService.checkPlay();
    // GameController.startNewPlay(this.gameService.getCurrentScenario())
    // GameController.getPlay().getScenario().start()
  }

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
          console.log((play.getPlayer() as Character).getParent())
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
    console.log(this.play.getPlayer())
    return this.play.getPlayer() as Character;
  }

  getNarration(): Narration {
    return this.play.getNarration();
  }

  onClickPlayer(): void {
    this.router.navigate(['/' + INTERFACE_ID + '/player']);
  }

  onClickUnselectPlayer(): void {
    this.playerSelected = false;
  }

  onClickGame(): void {}
}
