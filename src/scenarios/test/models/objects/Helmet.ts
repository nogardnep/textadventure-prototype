import { Play } from 'src/game/models/Play';
import { EMPLACEMENT_KEYS } from 'src/game/enums/Emplacement';
import { UsableObject } from 'src/game/models/entities/UsableObject';
import { Name } from 'src/game/models/Name';
import { WithModifiers } from 'src/game/models/entities/constraints/WithModifiers';

export class Helmet extends UsableObject implements WithModifiers {
  constructor(play: Play) {
    super(play);

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
    return EMPLACEMENT_KEYS.head;
  }
}
