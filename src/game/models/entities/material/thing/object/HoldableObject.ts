import { Utils } from 'src/game/Utils';
import { ActionKey, ActionKeys } from 'src/game/dictionnaries/Actions';
import { TextManager } from 'src/game/TextManager';
import { MaterialEntity } from '../../../MaterialEntity';
import { Character } from '../../Character';
import { UsuableObject } from '../UsuableObject';

export class HoldableObject extends UsuableObject {
  held = false;

  getDisplayedActions(next?: ActionKey[], previous?: ActionKey[]) {
    return Utils.removeDuplications(
      super.getDisplayedActions().concat([ActionKeys.Hold, ActionKeys.Release])
    );
  }

  drop(): boolean {
    let canProceed = true;

    if (this.held) {
      canProceed = this.release();
    }

    if (canProceed) {
      super.drop();
    }

    return canProceed;
  }

  moveTo(newParent: MaterialEntity) {
    if (this.held) {
      const canProceed = this.release();

      if (canProceed) {
        super.moveTo(newParent);
      }
    } else {
      super.moveTo(newParent);
    }
  }

  hold(): boolean {
    let canProceed = false;
    let owner = this.getPlay().getEntity(this.parentId) as Character;

    const allHandsUsed = owner.getHeldObjects().length >= owner.hands;

    if (allHandsUsed) {
      this.getPlay().inform([
        {
          text: {
            fr: 'Toutes vos mains sont prises',
          },
        },
      ]);
      canProceed = false;
    } else {
      canProceed = true;
    }

    if (canProceed) {
      this.held = true;
      this.save();
    }

    return canProceed;
  }

  release(): boolean {
    let canProceed = true;

    if (canProceed) {
      this.held = false;
      this.save();
    }

    return canProceed;
  }

  getEmplacement(): string {
    return null;
  }
}
