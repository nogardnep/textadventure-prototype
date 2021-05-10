import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { BaseActionKeys } from '../../../../dictionnaries/actions';
import { Utils } from 'src/game/core/Utils';
import { MaterialEntity } from '../../MaterialEntity';
import { Thing } from '../Thing';
import { ActionReport } from 'src/game/core/models/Action';

export class UsuableObject extends Thing {
  getDisplayedActionKeys() {
    return Utils.removeDuplications(
      super
        .getDisplayedActionKeys()
        .concat([BaseActionKeys.Taking, BaseActionKeys.Dropping])
    );
  }

  giveTo(entity: MaterialEntity): boolean {
    this.moveTo(entity);

    return true;
  }

  droppedBy(target: Character): ActionReport {
    this.moveTo(target.getParent());

    return { success: true };
  }

  takenBy(target: MaterialEntity): ActionReport {
    this.moveTo(target);

    return { success: true };
  }
}
