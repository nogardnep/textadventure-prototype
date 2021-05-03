import { Play } from 'src/game/models/Play';
import { EMPLACEMENT_KEYS } from 'src/game/dictionnaries/Emplacement';
import { Thing } from 'src/game/models/entities/Thing';
import { Name } from 'src/game/models/Name';
import { WithModifiers } from 'src/game/models/entities/constraints/WithModifiers';
import { ActionKey } from 'src/game/dictionnaries/Actions';
import { Utils } from 'src/game/Utils';

export class Helmet extends Thing implements WithModifiers {
  constructor(play: Play) {
    super(play);

    this.wearable = true;
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
