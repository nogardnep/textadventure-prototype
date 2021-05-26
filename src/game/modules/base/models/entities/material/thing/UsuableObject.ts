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

    if (entity instanceof Character) {
      entity.addKnownEntity(this.getType());
    }

    return true;
  }

  droppedBy(entity: Character): ActionReport {
    this.moveTo(entity.getParent());

    return { success: true };
  }

  takenBy(entity: MaterialEntity): ActionReport {
    this.moveTo(entity);

    if (entity instanceof Character) {
      entity.addKnownEntity(this.getType());
    }

    return { success: true };
  }
}
