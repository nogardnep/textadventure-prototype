import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
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

  constructor(private gameService: GameService, private location: Location) {
    this.gameService.checkPlay();
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

  getPlayer(): Character {
    return this.play.getPlayer() as Character;
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
  }

  onClickBack(): void {
    this.location.back();
  }
}
