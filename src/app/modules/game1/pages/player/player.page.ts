import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';
import { Play } from 'src/game/core/models/Play';

@Component({
  selector: 'app-player-page',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit, OnDestroy {
  play: Play;
  private playSubscription: Subscription;
  selection: Entity;
  private selectionSubscription: Subscription;

  constructor(private gameService: GameService, private location: Location) {
    gameService.loadLastPlay(); // TODO: temp
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

    this.selectionSubscription = this.gameService.selectionSubject.subscribe(
      (selection: Entity) => {
        if (selection) {
          this.selection = selection;
        } else {
          this.selection = null;
        }
      }
    );

    this.gameService.emitSelection();
  }

  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();
  }

  onClickBack(): void {
    this.location.back();
  }
}
