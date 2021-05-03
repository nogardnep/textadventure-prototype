import { Component, Input, OnInit } from '@angular/core';
import { ActionKeys } from 'src/game/dictionnaries/Actions';
import { Entity } from 'src/game/models/Entity';
import { TextWrapper } from 'src/game/models/Text';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input() entity: Entity;

  constructor() {}

  ngOnInit() {}

  onClickAction(key: ActionKeys): void {
    this.entity.getPlay().executeAction(key, [this.entity]);
  }

  isVisible(key: ActionKeys): boolean {
    return this.entity.getPlay().checkAction(key, true, [this.entity]);
  }

  getText(key: ActionKeys): TextWrapper {
    return this.entity.getPlay().getAction(key).text;
  }
}
