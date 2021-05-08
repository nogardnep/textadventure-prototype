import { BaseActionKeys } from 'src/game/dictionnaries/Actions';
import { Utils } from 'src/game/Utils';
import { MaterialEntity } from '../../MaterialEntity';
import { Thing } from '../Thing';

export class UsuableObject extends Thing {
  getDisplayedActionKeys() {
    return Utils.removeDuplications(
      super.getDisplayedActionKeys().concat([BaseActionKeys.Taking, BaseActionKeys.Dropping])
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
