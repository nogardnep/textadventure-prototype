import { ActionKey, ActionKeys } from 'src/game/dictionnaries/Actions';
import { Immaterial } from './Immaterial';

export abstract class Spell extends Immaterial {
  getDisplayedActions(a?: ActionKey[], b?: ActionKey[]) {
    return super.getDisplayedActions([ActionKeys.Cast], a);
  }
}
