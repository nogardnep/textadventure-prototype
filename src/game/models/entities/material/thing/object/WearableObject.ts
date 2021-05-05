import { ActionKey, ActionKeys } from 'src/game/dictionnaries/Actions';
import { EMPLACEMENT_NAMES } from 'src/game/dictionnaries/Emplacement';
import { Character } from 'src/game/models/entities/material/Character';
import { TextManager } from 'src/game/TextManager';
import { Utils } from 'src/game/Utils';
import { MaterialEntity } from '../../../MaterialEntity';
import { UsuableObject } from '../UsuableObject';

export class WearableObject extends UsuableObject {
  worn = false;

  getDisplayedActions() {
    return Utils.removeDuplications(
      super.getDisplayedActions().concat([ActionKeys.Put, ActionKeys.Pull])
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
