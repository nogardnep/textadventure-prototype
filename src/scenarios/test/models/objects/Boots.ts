import { Play } from 'src/game/models/Play';
import { EMPLACEMENT_KEYS } from 'src/game/dictionnaries/Emplacement';
import { Thing } from 'src/game/models/entities/Thing';
import { WithModifiers } from 'src/game/models/entities/constraints/WithModifiers';
import { Name } from 'src/game/models/Name';

export class Boots extends Thing implements WithModifiers {
  constructor(play: Play) {
    super(play);

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
    return EMPLACEMENT_KEYS.foot;
  }
}
