import { GameService, MessageWrapper } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Play } from 'src/game/core/models/Play';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit, OnDestroy {
  play: Play;
  messages: MessageWrapper[];
  private playSubscription: Subscription;
  private messagesSubscription: Subscription;

  constructor(private gameService: GameService) {
    // TODO: remove?
    // gameService.checkPlay();
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
      }
    );

    this.gameService.emitMessages();
  }

  ngOnDestroy() {
    this.playSubscription.unsubscribe();
    this.messagesSubscription.unsubscribe();
  }

  getUnreadedMessages(): MessageWrapper[] {
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
}
