import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { TheFortress } from '../../TheFortress';

export class GreatEntry extends Place {
  getName() {
    return { fr: new Name('entrée principale') };
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.South,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Bridge.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
    ];
  }
}
