import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/game/core/models/Action';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

export type ActionWrapper = {
  key: string;
  args: any[];
  action: Action;
  text: string;
};

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() entity: BaseEntity;
  @Input() clickable: boolean = true;
  actions: ActionWrapper[];

  ngOnChanges() {
    this.udpate();
  }

  onClickItem(item: ActionWrapper): void {
    item.action.try(this.entity.getPlay().getPlayer(), item.args);
  }

  private checkUsuable(action: Action, args: any[]): boolean {
    return action.check(this.entity.getPlay().getPlayer(), args, true).usable;
  }

  private udpate(): void {
    this.actions = [];

    if (this.entity) {
      this.entity.getDisplayedActions().forEach((item) => {
        const key = typeof item === 'string' ? item : item.key;
        const action = this.entity.getPlay().getAction(key);
        const args: any[] =
          typeof item === 'string' ? [this.entity] : item.args;

        if (this.checkUsuable(action, args)) {
          this.actions.push({ key, args, action, text: action.getText() });
        }
      });
    }
  }
}
