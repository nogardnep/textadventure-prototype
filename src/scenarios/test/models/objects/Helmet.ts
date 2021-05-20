import { EmplacementKey } from './../../../../game/modules/base/dictionnaries/emplacement';
import { WithModifiers } from 'src/game/modules/base/models/entities/constraints/WithModifiers';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';
import { Name } from 'src/game/core/models/Name';
import { Play } from 'src/game/core/models/Play';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

export class Helmet extends WearableObject implements WithModifiers {
  constructor(play: Play) {
    super(play);
  }

  // getDisplayedActions() {
  //   return super.getDisplayedActions().concat(['look']);
  // }

  getName() {
    return  new Name('Helmet');
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
    return EmplacementKey.Head;
  }
}
