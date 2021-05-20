import { EmplacementKey } from './../../../../game/modules/base/dictionnaries/emplacement';
import { WithModifiers } from 'src/game/modules/base/models/entities/constraints/WithModifiers';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';
import { Name } from 'src/game/core/models/Name';
import { Play } from 'src/game/core/models/Play';

export class Boots extends WearableObject implements WithModifiers {
  constructor(play: Play) {
    super(play);
  }

  getName() {
    return  new Name('Boots');
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
    return EmplacementKey.Foot;
  }
}
