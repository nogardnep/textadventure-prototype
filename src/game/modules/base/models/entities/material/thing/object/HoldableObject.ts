import { ActionReport } from 'src/game/core/models/Action';
import { Utils } from 'src/game/core/Utils';
import { BaseActionKeys } from '../../../../../dictionnaries/actions';
import { BaseGlossaryKey } from '../../../../BaseGlossary';
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

  moveTo(newParent: MaterialEntity) {
    if (this.held) {
      this.held = false;
    }

    return super.moveTo(newParent);
  }

  heldBy(target: Character): ActionReport {
    let success = false;
    let failureMessage: string;
    let owner = this.getPlay().getEntity(this.parentId) as Character;

    const allHandsUsed = owner.getHeldObjects().length >= owner.hands;

    if (allHandsUsed) {
      failureMessage = BaseGlossaryKey.AllHandsUsed;
      success = false;
    } else {
      success = true;
    }

    if (success) {
      this.held = true;
      this.save();
    }

    return {
      success,
      message: failureMessage,
    };
  }

  releasedBy(target: Character): ActionReport {
    let success = true;

    if (success) {
      this.held = false;
      this.save();
    }

    return { success };
  }

  droppedBy(target: Character): ActionReport {
    let success = true;

    if (this.held) {
      success = this.getPlay()
        .getAction(BaseActionKeys.Releasing)
        .use(target, [this]);
    }

    if (success) {
      super.droppedBy(target);
    }

    return { success };
  }

  getEmplacement(): string {
    return null;
  }
}
