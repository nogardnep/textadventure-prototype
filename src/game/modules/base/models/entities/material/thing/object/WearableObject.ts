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
      super.getDisplayedActionKeys().concat([BaseActionKeys.Putting, BaseActionKeys.Pulling])
    );
  }

  drop(): boolean {
    let canProceed = true;

    if (this.worn) {
      canProceed = this.pull();
    }

    if (canProceed) {
      super.drop();
    }

    return canProceed;
  }

  moveTo(newParent: MaterialEntity) {
    if (this.worn) {
      const pulled = this.pull();

      if (pulled) {
        super.moveTo(newParent);
      }
    } else {
      super.moveTo(newParent);
    }
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
