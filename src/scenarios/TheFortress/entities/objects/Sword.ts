import { Name } from 'src/game/core/models/Name';
import { BaseCaracteristicKey } from 'src/game/modules/base/dictionnaries/caracteristics';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';

export class Sword extends HoldableObject {
  getName() {
    return new Name('épée', { feminin: true, elision: true });
  }

  getModifiers() {
    return {
      [BaseCaracteristicKey.Force]: {
        value: 2,
        check: () => {
          return this.held;
        },
      },
      [BaseCaracteristicKey.Dexterity]: {
        value: -2,
        check: () => {
          return this.held;
        },
      },
    };
  }
}
