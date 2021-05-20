import { EmplacementKey } from 'src/game/modules/base/dictionnaries/emplacement';
import { Name } from 'src/game/core/models/Name';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';

export class Helmet extends WearableObject {
  getName() {
    return new Name('casque');
  }

  getEmplacement() {
    return EmplacementKey.Head;
  }
}
