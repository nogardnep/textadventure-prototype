import { ActionKey } from 'src/game/dictionnaries/Actions';
import { EMPLACEMENT_KEYS } from 'src/game/dictionnaries/Emplacement';
import { WithModifiers } from 'src/game/models/entities/constraints/WithModifiers';
import { WearableObject } from 'src/game/models/entities/material/thing/object/WearableObject';
import { Name } from 'src/game/models/Name';
import { Play } from 'src/game/models/Play';

export class Helmet extends WearableObject implements WithModifiers {
  constructor(play: Play) {
    super(play);
  }

  getDisplayedActions() {
    return super.getDisplayedActions().concat(['look']);
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
