import { Entity } from 'src/game/core/models/Entity';
import { Action } from 'src/game/core/models/Action';
import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() entity: Character;

  constructor() {}

  ngOnInit() {}

  getActions(item: Entity): Action[] {
    let actions: Action[] = [];

    // this.entity.getDisplayedActions().forEach((key) => {
    //   const action = this.entity.getPlay().getAction(key);
    //   console.log(action);

    //   if (!action.check || action.check(this.entity, [item], true)) {
    //     actions.push(action);
    //   }
    // });

    return actions;
  }
}
