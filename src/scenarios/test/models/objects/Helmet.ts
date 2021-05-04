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

  getDisplayedActions(additionnal1?: ActionKey[], additionnal2?: ActionKey[]) {
    // return super.getDisplayedActions(Utils.mergeArrays(
    //   ["look"],
    //   additionnal,
    //   true
    // ));
    return super.getDisplayedActions(['look'], additionnal1);
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
