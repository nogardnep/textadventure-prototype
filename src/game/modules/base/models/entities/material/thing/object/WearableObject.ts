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
    let canProceed = false;

    if (this.worn) {
      canProceed = this.pulledBy(newParent as Character);
    } else {
      canProceed = true;
    }

    if (canProceed) {
      super.moveTo(newParent);
    }

    return canProceed;
  }

  puttedBy(target: Character): boolean {
    let canProceed = false;
    let owner: Character = this.getParent() as Character;

    const alreadyWornObject = owner.getWornObject(this.getEmplacement());

    if (alreadyWornObject) {
      // TODO: use glossary
      // target.inform([
      //   {
      //     text: {
      //       fr:
      //         'Something already worn at ' +
      //         TextManager.extractName(
      //           EMPLACEMENT_NAMES[this.getEmplacement()]
      //         ).printSimple(),
      //     },
      //   },
      // ]);
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

  pulledBy(target: Character): boolean {
    let canProceed = true;

    if (canProceed) {
      this.worn = false;
      this.save();
    }

    return canProceed;
  }

  droppedBy(target: Character): boolean {
    let canProceed = true;

    if (this.worn) {
      canProceed = this.pulledBy(target);
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
