import { BasePlay } from 'src/game/modules/base/BasePlay';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-player-page',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit, OnDestroy {
  play: Play;
  private playSubscription: Subscription;
  interfaceId: string;
  player: Character;

  constructor(
    private gameService: GameService,
    private location: Location,
    private interfaceService: InterfaceService
  ) {
    this.interfaceId = this.interfaceService.getInterfaceId();
    this.gameService.checkPlay();
  }

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: BasePlay) => {
        if (play) {
          this.play = play;
          this.player = play.getPlayer();
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

  onClickBack(): void {
    this.location.back();
  }
}
