import { TextManager } from 'src/game/TextManager';
import { Character } from 'src/game/models/entities/Character';
import { Action } from 'src/game/models/Action';
import { Entity, EntityId } from 'src/game/models/Entity';
import { EMPLACEMENT_NAMES } from 'src/game/enums/Emplacement';
import { Thing } from './Thing';

export abstract class UsableObject extends Thing {
  wearable = false;
  fixed = false;
  worn = false;
  openable = false;
  closed = true;
  transparent = false;
  holdable = false;
  hold = false;

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
            this.getPlay().getPlayer().owns(this, false)
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
            this.getPlay().getPlayer().owns(this, false)
          );
        },
      },
      {
        text: { fr: 'take' },
        proceed: () => {
          this.giveTo(this.getPlay().getPlayer());
        },
        condition: () => {
          return (
            !this.fixed &&
            !this.getPlay().getPlayer().owns(this, false) &&
            this.getPlay().getPlayer().canReach(this)
          );
        },
      },
      {
        text: { fr: 'drop' },
        proceed: () => {
          this.drop();
        },
        condition: () => {
          return !this.fixed && this.getPlay().getPlayer().owns(this, false);
        },
        duration: 0,
      },
      {
        text: { fr: 'open' },
        proceed: () => {
          this.closed = false;
        },
        condition: () => {
          return this.openable && this.closed;
        },
        duration: 0,
      },
      {
        text: { fr: 'close' },
        proceed: () => {
          this.closed = true;
        },
        condition: () => {
          return this.openable && !this.closed;
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
        this.getPlay().getEntity(this.getPlay().getPlayer().getParentId())
      );
    }

    return canProceed;
  }

  put(): boolean {
    let canProceed = false;
    let owner: Character = this.getPlay().getEntity(this.parentId) as Character;

    const alreadyWornObject = owner.getWornObject(this.getEmplacement());

    if (alreadyWornObject) {
      this.getPlay().inform([
        {
          text: {
            fr:
              'Something already worn at ' +
              TextManager.extractName(
                EMPLACEMENT_NAMES[this.getEmplacement()]
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
