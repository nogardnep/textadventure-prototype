import { Component, Input } from '@angular/core';
import { MessageWrapper } from 'src/app/services/game.service';
import { Choice } from 'src/game/core/models/Choice';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  @Input() messages: MessageWrapper[];

  onClickReaded(message: MessageWrapper) {
    message.read = true;
  }

  onClickChoice(choice: Choice) {
    choice.proceed();
  }

  isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }
}
