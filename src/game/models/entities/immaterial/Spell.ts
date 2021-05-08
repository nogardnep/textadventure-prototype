import { BaseActionKeys } from 'src/game/dictionnaries/Actions';
import { ImmaterialEntity } from '../ImmaterialEntity';

export  class Spell extends ImmaterialEntity {
  getDisplayedActionKeys() {
    return super.getDisplayedActionKeys().concat([BaseActionKeys.Casting]);
  }
}
