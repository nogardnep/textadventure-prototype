import { TheFortress } from './../../TheFortress';
import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Place } from 'src/game/modules/base/models/entities/material/Place';

export class SecreteEntry extends Place {
  getName() {
    return { fr: new Name('entrée secrète') };
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.South,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Crevasse.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
    ];
  }
}
