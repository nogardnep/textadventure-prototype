import { GameController } from './../../../../game/GameController';
import { Action } from './../../../../game/models/Action';
import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/game/models/Entity';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input() entity: Entity;

  constructor() {}

  ngOnInit() {}

  onClickAction(action: Action): void {
    GameController.useAction(action);
  }

  isVisible(action: Action): boolean {
    return !action.condition || action.condition();
  }

  getActions(): Action[] {
    return this.entity.getActions();
  }
}
