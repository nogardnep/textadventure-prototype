import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
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
  private updateSubscription: Subscription;
  ended: boolean;
  player: Character;
  location: MaterialEntity;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {
    gameService.checkPlay();
  }

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        this.play = play;

        if (play) {
          this.update();
        }
      }
    );

    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });

    this.gameService.emitPlay();

    this.gameService.onLocationUpdated();
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  onClickUnselectPlayer(): void {
    this.playerSelected = false;
  }

  onClickGame(): void {}

  onClickBackHome(): void {
    this.interfaceService.goToHome();
  }

  private update(): void {
    this.player = this.play.getPlayer() as Character;
    this.location = this.player.getParent();
    this.ended = this.play.isEnded();
  }
}
