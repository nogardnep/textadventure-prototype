import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonType,
  InterfaceService,
} from 'src/app/services/interface.service';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { Message } from 'src/game/core/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() last: boolean;
  choices: Choice[];

  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.choices = [];

    if (this.message.choices) {
      this.message.choices.forEach((choice) => {
        if (!choice.check || choice.check()) {
          this.choices.push(choice);
        }
      });
    }
  }

  onClickChoice(choice: Choice) {
    this.interfaceService.onClickButton(ButtonType.Simple);
    choice.proceed();
  }

  onItemClicked(item: Entity) {
    this.interfaceService.setSelection(item);
  }
}
