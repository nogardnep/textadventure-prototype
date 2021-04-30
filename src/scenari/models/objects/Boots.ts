import { emplacementKeys } from './../../../game/models/Emplacement';
import { EmplacementKey } from '../../../game/models/Emplacement';
import { WearableObject } from 'src/game/models/entity/WearableObject';
import { Name } from '../../../game/models/Name';;
import { WithModifiers } from '../../../game/models/entity/WithModifiers';

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
