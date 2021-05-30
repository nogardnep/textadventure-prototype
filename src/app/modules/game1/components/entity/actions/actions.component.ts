import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Action } from 'src/game/core/models/Action';
import { Entity } from 'src/game/core/models/Entity';

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
export class ActionsComponent implements OnInit {
  @Input() entity: Entity;
  private updateSubscription: Subscription;
  toDisplay: boolean;
  actions: ActionWrapper[];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  onClickItem(item: ActionWrapper): void {
    item.action.try(this.entity.getPlay().getPlayer(), item.args);
  }

  private checkUsuable(action: Action, args: any[]): boolean {
    return action.check(this.entity.getPlay().getPlayer(), args, true).usable;
  }

  private update() :void {
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

    this.toDisplay = this.actions.length > 0;
  }
}
