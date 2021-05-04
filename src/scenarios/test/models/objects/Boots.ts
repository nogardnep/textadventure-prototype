import { EMPLACEMENT_KEYS } from 'src/game/dictionnaries/Emplacement';
import { WithModifiers } from 'src/game/models/entities/constraints/WithModifiers';
import { WearableObject } from 'src/game/models/entities/material/thing/object/WearableObject';
import { UsuableObject } from 'src/game/models/entities/material/thing/UsuableObject';
import { Name } from 'src/game/models/Name';
import { Play } from 'src/game/models/Play';

export class Boots extends WearableObject implements WithModifiers {
  constructor(play: Play) {
    super(play);
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
