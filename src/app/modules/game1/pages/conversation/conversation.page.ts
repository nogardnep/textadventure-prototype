import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  interlocutor: Character;
  play: Play;
  private playSubscription: Subscription;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    gameService.checkPlay();
  }

  ngOnInit() {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
          const entity = this.play.getEntity(
            this.route.snapshot.paramMap.get('id')
          );

          if (entity && entity instanceof Character) {
            this.interlocutor = entity;
          } else {
            this.interlocutor = null;
          }
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
