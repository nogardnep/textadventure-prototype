import { WearableObject as WearableObject } from 'src/game/models/entity/WearableObject';
import { Action } from 'src/game/models/Action';
import { GameController } from './../../GameController';
import { Entity } from './../Entity';

export abstract class UsableObject extends Entity {
  getActions(additionnal?: Action[]) {
    let actions: Action[] = [
      {
        text: { fr: 'take' },
        proceed: () => {
          this.moveTo(
            GameController.getEntity(GameController.getPlayer().getId())
          );
        },
        condition: () => {
          return this.getParentId() !== GameController.getPlay().playerId;
        },
      },
      {
        text: { fr: 'drop' },
        proceed: () => {
          if (this instanceof WearableObject) {
            this.pull();
          }

          this.moveTo(
            GameController.getEntity(GameController.getPlayer().getParentId())
          );
        },
        condition: () => {
          return this.getParentId() === GameController.getPlay().playerId;
        },
        duration: 0
      },
    ];

    if (additionnal) {
      actions = actions.concat(additionnal);
    }

    return super.getActions(actions);
  }
}
