import { ActionKey, ActionKeys } from 'src/game/dictionnaries/Actions';
import { ImmaterialEntity } from '../ImmaterialEntity';

export  class Spell extends ImmaterialEntity {
  getDisplayedActions() {
    return super.getDisplayedActions().concat([ActionKeys.Cast]);
  }
}
