import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { BaseActionKeys } from '../../../../dictionnaries/actions';
import { Utils } from 'src/game/core/Utils';
import { MaterialEntity } from '../../MaterialEntity';
import { Thing } from '../Thing';

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

  droppedBy(target: Character): boolean {
    this.moveTo(target.getParent());

    return true;
  }

  takenBy(target: MaterialEntity): boolean {
    this.moveTo(target);

    return true;
  }
}
