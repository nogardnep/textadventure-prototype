import { Name } from 'src/game/core/models/Name';
import { BaseCaracteristicKey } from 'src/game/modules/base/dictionnaries/caracteristics';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';

export class MagicStick extends HoldableObject {
  getName() {
    return new Name('bâton de magie');
  }

  getModifiers() {
    return {
      [BaseCaracteristicKey.Magic]: {
        value: 5,
        check: () => {
          return this.held;
        },
      },
    };
  }
}
