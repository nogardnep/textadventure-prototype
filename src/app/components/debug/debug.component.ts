import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Play } from 'src/game/models/Play';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit , OnDestroy {
  play: Play;

  private playSubscription: Subscription;

  constructor(private gameService: GameService) {
    this.gameService.loadLastPlay();
  }

  ngOnInit() {
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

  ngOnDestroy() {
    this.playSubscription.unsubscribe();
  }
}
