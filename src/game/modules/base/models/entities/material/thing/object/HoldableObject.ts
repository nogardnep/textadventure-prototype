import { BaseActionKeys } from '../../../../../dictionnaries/actions';
import { Utils } from 'src/game/core/Utils';
import { MaterialEntity } from '../../../MaterialEntity';
import { Character } from '../../Character';
import { UsuableObject } from '../UsuableObject';

export class HoldableObject extends UsuableObject {
  held = false;

  getDisplayedActionKeys() {
    return Utils.removeDuplications(
      super
        .getDisplayedActionKeys()
        .concat([BaseActionKeys.Holding, BaseActionKeys.Releasing])
    );
  }

  moveTo(target: MaterialEntity) {
    let canProceed = false;

    if (this.held) {
      canProceed = this.releasedBy(target as Character);
    } else {
      canProceed = true;
    }

    if (canProceed) {
      super.moveTo(target);
    }

    return canProceed;
  }

  heldBy(target: Character): boolean {
    let canProceed = false;
    let owner = this.getPlay().getEntity(this.parentId) as Character;

    const allHandsUsed = owner.getHeldObjects().length >= owner.hands;

    if (allHandsUsed) {
      // this.getPlay().inform([
      //   {
      //     text: {
      //       fr: 'Toutes vos mains sont prises',
      //     },
      //   },
      // ]);
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

  releasedBy(target: Character): boolean {
    let canProceed = true;

    if (canProceed) {
      this.held = false;
      this.save();
    }

    return canProceed;
  }

  droppedBy(target: Character): boolean {
    let canProceed = true;

    if (this.held) {
      canProceed = this.releasedBy(target);
    }

    if (canProceed) {
      super.droppedBy(target);
    }

    return canProceed;
  }

  getEmplacement(): string {
    return null;
  }
}
