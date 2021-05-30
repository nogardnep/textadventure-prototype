import { InterfaceService } from 'src/app/services/interface.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Play } from 'src/game/core/models/Play';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit, OnDestroy {
  selection: BaseEntity;
  play: Play;
  private playSubscription: Subscription;
  interfaceId: string;

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private interfaceService: InterfaceService
  ) {
    gameService.checkPlay();
    this.interfaceId = this.interfaceService.getInterfaceId();
  }

  ngOnInit() {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
          const entity = this.play.getEntity(
            this.activatedRoute.snapshot.paramMap.get('id')
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
    this.playSubscription.unsubscribe();
  }
}
