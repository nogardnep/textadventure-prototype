import { BASE_ACTIONS } from 'src/game/modules/base/dictionnaries/actions';
import { UsuableObject } from '../UsuableObject';

export class ShootableObject extends UsuableObject {
  getDisplayedActions() {
    return super.getDisplayedActions().concat([
      {
        key: BASE_ACTIONS.Shooting.name,
        args: [undefined, this],
      },
    ]);
  }
}
