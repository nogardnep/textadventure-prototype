import { ActionKey, ActionKeys } from 'src/game/dictionnaries/Actions';
import { ImmaterialEntity } from '../ImmaterialEntity';

export  class Spell extends ImmaterialEntity {
  getDisplayedActions(a?: ActionKey[], b?: ActionKey[]) {
    return super.getDisplayedActions([ActionKeys.Cast], a);
  }
}
