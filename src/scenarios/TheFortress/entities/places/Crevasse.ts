import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { TheFortress } from '../../TheFortress';

export class Crevasse extends Place {
  getName() {
    return { fr: new Name('creavass') };
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.North,
        destinationId: this.getPlay()
          .getFirstEntityOfType(
            TheFortress.entityConstructors.SecreteEntry.name
          )
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
      {
        directionKey: DirectionKeys.West,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
    ];
  }
}
