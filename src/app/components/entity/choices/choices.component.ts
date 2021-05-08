import { Component, Input, OnInit } from '@angular/core';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss'],
})
export class ChoicesComponent implements OnInit {
  @Input() entity: Entity;

  constructor() {}

  ngOnInit() {}

  onClickChoice(choice: Choice): void {
    choice.proceed();
  }

  isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }
}
