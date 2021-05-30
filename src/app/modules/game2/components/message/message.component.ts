import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/game/core/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() clickable: boolean = true;

  constructor() {}

  ngOnInit() {}
}
