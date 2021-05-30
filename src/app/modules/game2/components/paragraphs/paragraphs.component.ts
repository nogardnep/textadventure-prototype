import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/services/interface.service';
import { Action } from 'src/game/core/models/Action';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseActionKeys } from 'src/game/modules/base/dictionnaries/actions';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

@Component({
  selector: 'entity-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss'],
})
export class ParagraphsComponent implements OnInit {
  @Input() paragraphs: Paragraph[];
  @Input() clickable: boolean = true;

  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  onClickItem(entity: BaseEntity): void {
    console.log(this.getActionsFor(entity));
  }

  getActionsFor(entity: BaseEntity): { [key: string]: Action } {
    const actions = {};

    // entity.getDisplayedActions().forEach((key: string) => {
    //   const action = entity.getPlay().getAction(key);

    //   if (this.isUsable(action, entity)) {
    //     actions[key] = action;
    //   }
    // });

    return actions;
  }

  onClickAction(action: Action, entity: BaseEntity): void {
    entity.getPlay().getPlayer();
    action.use(entity.getPlay().getPlayer(), [entity]);
  }

  isUsable(action: Action, entity: BaseEntity): boolean {
    return action.check(entity.getPlay().getPlayer(), [entity], true).usable;
  }

  toDisplay(entity: BaseEntity): boolean {
    return Object.keys(this.getActionsFor(entity)).length > 0;
  }
}
