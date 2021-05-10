import { TheFortress } from './../../TheFortress';
import { Name } from 'src/game/core/models/Name';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';

export class MountainousPath extends Place {
  getName() {
    return { fr: new Name('sentier') };
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.North,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
          .getId(),
        text: { fr: 'le sentier monte vers un plateau' },
        distance: 20,
      },
    ];
  }
}
