import { ActionKeys, ActionKey } from '../../dictionnaries/Actions';
import { TextManager } from 'src/game/TextManager';
import { Character } from 'src/game/models/entities/Character';
import { Choice } from 'src/game/models/Choice';
import { Entity, EntityId } from 'src/game/models/Entity';
import { EMPLACEMENT_NAMES } from 'src/game/dictionnaries/Emplacement';
import { Material } from './Material';
import { Utils } from 'src/game/Utils';

export abstract class Thing extends Material {
  wearable = false;
  fixed = false;
  worn = false;
  openable = false;
  closed = true;
  transparent = false;
  holdable = false;
  hold = false;

  getDisplayedActions(a?: ActionKey[], b?: ActionKey[]) {
    return super.getDisplayedActions([ActionKeys.Take, ActionKeys.Drop], a);
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

  close(): void {
    this.closed = true;
  }

  open(): void {
    this.closed = false;
  }

  getEmplacement(): string {
    return null;
  }
}
