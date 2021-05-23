import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Narration } from 'src/game/core/models/Narration';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-game-page',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  play: Play;
  playerSelected: boolean = false;
  private playSubscription: Subscription;

  constructor(private gameService: GameService) {
    gameService.checkPlay();
    // GameController.startNewPlay(this.gameService.getCurrentScenario())
    // GameController.getPlay().getScenario().start()
  }

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        this.play = play;
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

  onClickUnselectPlayer(): void {
    this.playerSelected = false;
  }

  onClickGame(): void {}

  getLocation(): MaterialEntity {
    return this.getPlayer().getParent();
  }
}
