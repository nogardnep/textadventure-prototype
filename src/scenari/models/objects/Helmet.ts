import { emplacementKeys } from 'src/game/enums/Emplacement';
import { UsableObject } from 'src/game/models/entity/UsableObject';
import { Name } from 'src/game/models/Name';
import { WithModifiers } from 'src/game/models/entity/WithModifiers';

export class Helmet extends UsableObject implements WithModifiers {
  constructor() {
    super();

    this.wearable = true;
  }

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
