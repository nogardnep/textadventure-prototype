import { emplacementKeys } from 'src/game/enums/Emplacement';
import { UsableObject } from 'src/game/models/entity/UsableObject';
import { WithModifiers } from 'src/game/models/entity/WithModifiers';
import { Name } from 'src/game/models/Name';

export class Boots extends UsableObject implements WithModifiers {
  constructor() {
    super();

    this.wearable = true;
  }

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
