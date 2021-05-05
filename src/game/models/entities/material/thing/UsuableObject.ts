import { ActionKeys } from 'src/game/dictionnaries/Actions';
import { Utils } from 'src/game/Utils';
import { MaterialEntity } from '../../MaterialEntity';
import { Thing } from '../Thing';

export class UsuableObject extends Thing {
  getDisplayedActions() {
    return Utils.removeDuplications(
      super.getDisplayedActions().concat([ActionKeys.Take, ActionKeys.Drop])
    );
  }

  giveTo(entity: MaterialEntity): boolean {
    this.moveTo(entity);

    return true;
  }

  drop(): boolean {
    this.moveTo(this.getParent().getParent());

    return true;
  }
}
