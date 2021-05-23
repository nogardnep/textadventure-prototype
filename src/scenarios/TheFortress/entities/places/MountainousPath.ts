import { TheFortress } from './../../TheFortress';
import { Name } from 'src/game/core/models/Name';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

export class MountainousPath extends Place {
  getName() {
    return new Name('sentier');
  }

  getFullImages() {
    return [
      { image: TheFortress.images.sky2 },
      { image: TheFortress.images.moutainousPath },
    ];
  }

  getInteriorDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'Un chemin dans la montagne.',
      },
    ];
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.North,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
          .getId(),
        text: 'Le sentier monte vers un plateau.',
        distance: 20,
      },
    ];
  }
}
