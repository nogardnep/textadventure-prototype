import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Action } from 'src/game/core/models/Action';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input() entity: Entity;

  constructor() {}

  ngOnInit() {}

  getActions(): { [key: string]: Action } {
    const actions = {};

    this.entity.getDisplayedActionKeys().forEach((key: string) => {
      const action = this.entity.getPlay().getAction(key);

      if (this.isVisible(action)) {
        actions[key] = action;
      }
    });

    return actions;
  }

  onClickAction(action: Action): void {
    action.use(this.entity.getPlay().getPlayer(), [this.entity]);
  }

  isVisible(action: Action): boolean {
    return action.check(this.entity.getPlay().getPlayer(), [this.entity], true)
      .usable;
  }

  toDisplay(): boolean {
    return Object.keys(this.getActions()).length > 0;
  }
}
