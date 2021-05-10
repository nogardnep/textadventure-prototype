import { BaseGlossaryKey } from 'src/game/modules/base/models/BaseGlossary';
import { ActionReport } from 'src/game/core/models/Action';
import { BaseActionKeys } from '../../../../../dictionnaries/actions';
import { EMPLACEMENT_NAMES } from '../../../../../dictionnaries/emplacement';
import { Character } from '../../Character';
import { TextManager } from 'src/game/core/TextManager';
import { Utils } from 'src/game/core/Utils';
import { MaterialEntity } from '../../../MaterialEntity';
import { UsuableObject } from '../UsuableObject';

export class WearableObject extends UsuableObject {
  worn = false;

  getDisplayedActionKeys() {
    return Utils.removeDuplications(
      super
        .getDisplayedActionKeys()
        .concat([BaseActionKeys.Putting, BaseActionKeys.Pulling])
    );
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

    if (alreadyWornObject) {
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

    if (this.worn) {
      success = this.getPlay()
        .getAction(BaseActionKeys.Pulling)
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
