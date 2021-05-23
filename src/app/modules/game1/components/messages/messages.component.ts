import { Component, Input } from '@angular/core';
import { MessageWrapper } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Choice } from 'src/game/core/models/Choice';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  @Input() messages: MessageWrapper[];

  constructor(private interfaceService: InterfaceService) {}

  onClickReaded(message: MessageWrapper) {
    this.interfaceService.onClickButton();
    message.read = true;
  }

  onClickChoice(choice: Choice) {
    this.interfaceService.onClickButton();
    choice.proceed();
  }

  isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }
}
