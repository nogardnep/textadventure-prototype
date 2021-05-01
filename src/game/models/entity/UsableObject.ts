import { TextManager } from 'src/game/TextManager';
import { Character } from 'src/game/models/entity/Character';
import { Action } from 'src/game/models/Action';
import { GameController } from 'src/game/GameController';
import { Entity, EntityId } from 'src/game/models/Entity';
import { emplacementNames } from 'src/game/enums/Emplacement';

export abstract class UsableObject extends Entity {
  wearable = false;
  fixed = false;
  worn = false;

  getActions(additionnal?: Action[]) {
    let actions: Action[] = [
      {
        text: { en: 'put' },
        proceed: () => {
          this.put();
        },
        condition: () => {
          return (
            this.wearable &&
            !this.worn &&
            GameController.getPlayer().owns(this.getId())
          );
        },
      },
      {
        text: { en: 'pull' },
        proceed: () => {
          this.pull();
        },
        condition: () => {
          return (
            this.wearable &&
            this.worn &&
            GameController.getPlayer().owns(this.getId())
          );
        },
      },
      {
        text: { fr: 'take' },
        proceed: () => {
          this.giveTo(GameController.getPlayer());
        },
        condition: () => {
          return (
            this.fixed &&
            this.getParentId() !== GameController.getPlay().playerId
          );
        },
      },
      {
        text: { fr: 'drop' },
        proceed: () => {
          this.drop();
        },
        condition: () => {
          return (
            this.fixed &&
            this.getParentId() === GameController.getPlay().playerId
          );
        },
        duration: 0,
      },
    ];

    if (additionnal) {
      actions = actions.concat(additionnal);
    }

    return super.getActions(actions);
  }

  giveTo(entity: Entity): boolean {
    this.moveTo(entity);

    return true;
  }

  drop(): boolean {
    let canProceed = true;

    if (this.worn) {
      canProceed = this.pull();
    }

    if (canProceed) {
      this.moveTo(
        GameController.getEntity(GameController.getPlayer().getParentId())
      );
    }

    return canProceed;
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

  moveTo(newParent: Entity) {
    if (this.wearable && this.worn) {
      const pulled = this.pull();

      if (pulled) {
        super.moveTo(newParent);
      }
    } else {
      super.moveTo(newParent);
    }
  }

  pull(): boolean {
    let canProceed = true;

    if (canProceed) {
      this.worn = false;
      this.save();
    }

    return canProceed;
  }

  getEmplacement(): string {
    return null;
  }
}
