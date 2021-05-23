import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Play } from 'src/game/core/models/Play';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit, OnDestroy {
  selection: BaseEntity;
  play: Play;
  private selectionSubscription: Subscription;
  private playSubscription: Subscription;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    gameService.checkPlay();
  }

  ngOnInit() {
    // this.selectionSubscription = this.gameService.selectionSubject.subscribe(
    //   (selection: Entity) => {
    //     if (selection) {
    //       this.selection = selection;
    //     } else {
    //       this.selection = null;
    //     }
    //   }
    // );

    // this.gameService.emitSelection();

    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
          const entity = this.play.getEntity(
            this.route.snapshot.paramMap.get('id')
          ) as BaseEntity;
          // this.gameService.setSelection(entity);
          this.selection = entity;
        } else {
          this.play = null;
        }
      }
    );

    this.gameService.emitPlay();
  }

  ngOnDestroy() {
    // this.selectionSubscription.unsubscribe();
    this.playSubscription.unsubscribe();
  }
}
