import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, InterfaceService } from 'src/app/services/interface.service';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss'],
})
export class ChoicesComponent implements OnInit {
  @Input() entity: Entity;

  constructor(private interfaceService:InterfaceService) {}

  ngOnInit() {}

  onClickChoice(choice: Choice): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.entity.getPlay().useChoice(choice);
  }

  isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }

  getChoices(): Choice[] {
    return this.entity.getChoices();
  }
}
