import { InterfaceService } from 'src/app/services/interface.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService, MessageWrapper } from 'src/app/services/game.service';
import { Play } from 'src/game/core/models/Play';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit, OnDestroy {
  messages: MessageWrapper[];
  play: Play;
  private messagesSubscription: Subscription;
  private playSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {
    gameService.checkPlay();
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

    this.messagesSubscription = this.gameService.messagesSubject.subscribe(
      (message: MessageWrapper[]) => {
        this.messages = message;

        if (this.getUnreadMessages().length === 0) {
          this.onEmpty();
        }
      }
    );

    this.gameService.emitMessages();
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
    this.playSubscription.unsubscribe();
  }

  getUnreadMessages(): MessageWrapper[] {
    let found: MessageWrapper[] = [];

    this.messages.forEach((item) => {
      if (!item.read) {
        found.push(item);
      }
    });

    return found;
  }

  onClickBack(): void {
    this.messages.forEach((item) => {
      item.read = true;
    });
  }

  onClickOk(): void {
    this.messages.forEach((item) => {
      item.read = true;
    });

    this.interfaceService.goToGame();
  }

  onEmpty(): void {
    this.interfaceService.goToGame();
  }
}
