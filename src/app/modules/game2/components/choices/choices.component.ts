import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss'],
})
export class ChoicesComponent implements OnInit, OnChanges {
  @Input() entity: Entity;
  choices = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.choices = this.entity.getChoices();
  }

  onClickChoice(choice: Choice): void {
    this.entity.getPlay().useChoice(choice);
  }

  isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }
}
