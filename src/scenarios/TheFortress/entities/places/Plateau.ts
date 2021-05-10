import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import {
  Place
} from 'src/game/modules/base/models/entities/material/Place';
import { TheFortress } from '../../TheFortress';

export class Plateau extends Place {
  getName() {
    return { fr: new Name('plateau') };
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.North,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Bridge.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
      {
        directionKey: DirectionKeys.South,
        destinationId: this.getPlay()
          .getFirstEntityOfType(
            TheFortress.entityConstructors.MountainousPath.name
          )
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
      {
        directionKey: DirectionKeys.East,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Crevasse.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
    ];
  }
}
