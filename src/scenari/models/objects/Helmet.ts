import { WearableObject } from 'src/game/models/entity/WearableObject';
import { emplacementKeys } from 'src/game/enums/Emplacement';
import { Name } from '../../../game/models/Name';
import { WithModifiers } from './../../../game/models/entity/WithModifiers';

export class Helmet extends WearableObject implements WithModifiers {
  getName() {
    return { fr: new Name('Helmet') };
  }

  getModifiers() {
    return {
      resistance: {
        value: 10,
        condition: () => {
          return this.worn;
        },
      },
    };
  }

  getEmplacement() {
    return emplacementKeys.head;
  }
}
