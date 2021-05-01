import { WearableObject } from 'src/game/models/entity/WearableObject';
import { emplacementKeys } from 'src/game/enums/Emplacement';
import { WithModifiers } from '../../../game/models/entity/WithModifiers';
import { Name } from '../../../game/models/Name';
;

export class Boots extends WearableObject implements WithModifiers {
  getName() {
    return { fr: new Name('Boots') };
  }

  getModifiers() {
    return {
      resistance: {
        value: 2,
        condition: () => {
          return this.worn;
        },
      },
    };
  }

  getEmplacement() {
    return emplacementKeys.foot;
  }
}
