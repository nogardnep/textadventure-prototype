import { ActionReport } from 'src/game/core/models/Action';
import { Utils } from 'src/game/core/Utils';
import { BaseGlossaryKey } from 'src/game/modules/base/models/BaseGlossary';
import { BaseActionKeys } from '../../../../../dictionnaries/actions';
import { MaterialEntity } from '../../../MaterialEntity';
import { Character } from '../../Character';
import { UsuableObject } from '../UsuableObject';

export class WearableObject extends UsuableObject {
  private worn = false;

  getDisplayedActions() {
    return Utils.removeDuplications(
      super
        .getDisplayedActions()
        .concat([BaseActionKeys.Putting, BaseActionKeys.Pulling])
    );
  }

  isWorn(): boolean {
    return this.worn;
  }

  moveTo(newParent: MaterialEntity) {
    if (this.worn) {
      this.worn = false;
    }

    return super.moveTo(newParent);
  }

  puttedBy(target: Character): ActionReport {
    let success = false;
    let failureMessage: string;
    let owner: Character = this.getParent() as Character;

    const alreadyWornObject = owner.getWornObject(this.getEmplacement());

    if (!target.owns(this, false)) {
      const taken = target.useAction(BaseActionKeys.Taking, [this]);

      if (taken) {
        target.useAction(BaseActionKeys.Putting, [this]);
      } else {
        success = false;
      }
    } else if (alreadyWornObject) {
      failureMessage = this.getPlay().getPhrase(
        BaseGlossaryKey.SomethingAlreadyWorn,
        [target, this]
      );
      success = false;
    } else {
      success = true;
    }

    if (success) {
      this.worn = true;
      this.save();
    }

    return { success, message: failureMessage };
  }

  pulledBy(target: Character): ActionReport {
    let success = true;

    if (success) {
      this.worn = false;
      this.save();
    }

    return { success };
  }

  droppedBy(target: Character): ActionReport {
    let success = true;

    if (target.isHolding(this)) {
      success = target.useAction(BaseActionKeys.Pulling, [this]);
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
