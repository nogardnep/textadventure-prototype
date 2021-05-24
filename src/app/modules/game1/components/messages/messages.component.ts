import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MessageWrapper } from 'src/app/services/game.service';
import { ButtonType, InterfaceService } from 'src/app/services/interface.service';
import { Choice } from 'src/game/core/models/Choice';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  @Input() messages: MessageWrapper[];
  @Output() emptyEvent = new EventEmitter();

  constructor(private interfaceService: InterfaceService) {}

  onClickReaded() {
    this.interfaceService.onClickButton(ButtonType.Simple);

    this.emptyEvent.emit();

    this.messages.forEach((item) => {
      item.read = true;

      if (item.onReaded) {
        item.onReaded();
      }
    });
  }

  onClickChoice(choice: Choice) {
    this.interfaceService.onClickButton(ButtonType.Simple);
    choice.proceed();
  }

  isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }
}
