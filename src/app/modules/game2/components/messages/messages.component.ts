import { Component, Input, OnInit } from '@angular/core';
import { MessageWrapper } from './../../../../services/game.service';

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
}
