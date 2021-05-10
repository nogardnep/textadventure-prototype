import { BaseActionKeys } from '../../../dictionnaries/actions';
import { ImmaterialEntity } from '../ImmaterialEntity';

export class Spell extends ImmaterialEntity {
  getDisplayedActionKeys() {
    return super.getDisplayedActionKeys().concat([BaseActionKeys.CastingOn]);
  }
}
