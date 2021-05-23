import { InterfaceService } from 'src/app/services/interface.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService, MessageWrapper } from 'src/app/services/game.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit, OnDestroy {
  messages: MessageWrapper[];
  private messagesSubscription: Subscription;

  constructor(private gameService: GameService, private interfaceService:InterfaceService) {
    gameService.checkPlay();
  }

  ngOnInit() {
    this.messagesSubscription = this.gameService.messagesSubject.subscribe(
      (message: MessageWrapper[]) => {
        this.messages = message;
      }
    );

    this.gameService.emitMessages();
  }

  ngOnDestroy() {
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

  onClickOk(): void {
    this.messages.forEach((item) => {
      item.read = true;
    });

    this.interfaceService.goToGame();
  }
}
