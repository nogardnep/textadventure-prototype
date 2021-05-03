import { GameController } from '../../../../game/GameController';
import { Choice } from '../../../../game/models/Choice';
import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/game/models/Entity';

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
