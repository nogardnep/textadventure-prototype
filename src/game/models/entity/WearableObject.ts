import { TextManager } from 'src/game/TextManager';
import { GameController } from 'src/game/GameController';
import { Action } from 'src/game/models/Action';
import { Entity } from 'src/game/models/Entity';
import { UsableObject } from 'src/game/models/entity/UsableObject';
import { Character } from './Character';
import { emplacementNames } from '../../enums/Emplacement';

export abstract class WearableObject extends UsableObject {
  worn: boolean = false;

  getEmplacement(): string {
    return null;
  }

  getActions(additionnal?: Action[]) {
    let actions: Action[] = [
      {
        text: { en: 'put' },
        proceed: () => {
          this.put();
        },
        condition: () => {
          return !this.worn && GameController.getPlayer().owns(this.getId());
        },
      },
      {
        text: { en: 'pull' },
        proceed: () => {
          this.pull();
        },
        condition: () => {
          return this.worn && GameController.getPlayer().owns(this.getId());
        },
      },
    ];

    if (additionnal) {
      actions = actions.concat(additionnal);
    }

    return super.getActions(actions);
  }

  moveTo(newParent: Entity) {
    const pulled = this.pull();

    if (pulled) {
      super.moveTo(newParent);
    }
  }

  put(): boolean {
    let canProceed = false;
    let owner: Character = GameController.getEntity(this.parentId) as Character;

    const alreadyWornObject = owner.getWornObject(this.getEmplacement());

    if (alreadyWornObject) {
      console.log(TextManager.getName(emplacementNames[this.getEmplacement()]));
      GameController.inform([
        {
          text: {
            fr:
              'Something already worn at ' +
              TextManager.getName(
                emplacementNames[this.getEmplacement()]
              ).printSimple(),
          },
        },
      ]);
      canProceed = false;
    } else {
      canProceed = true;
    }

    if (canProceed) {
      this.worn = true;
      this.save();
    }

    return canProceed;
  }

  pull(): boolean {
    let canProceed = true;

    if (canProceed) {
      this.worn = false;
      this.save();
    }

    return canProceed;
  }
}
