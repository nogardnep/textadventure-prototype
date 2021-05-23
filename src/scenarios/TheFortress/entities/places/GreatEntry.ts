import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { TheFortress } from '../../TheFortress';

export class GreatEntry extends Place {
  getName() {
    return new Name('entrée principale', { feminin: true, elision: true });
  }

  getInteriorDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'Une place surélevée.',
      },
      {
        tag: ParagraphTag.Description,
        items: [
          { text: "Là est l'entrée de " },
          {
            text: 'la forteresse',
            entity: this.getPlay().getFirstEntityOfType(
              TheFortress.entityConstructors.Fortress.name
            ),
          },
          { text: '.' },
        ],
      },
      {
        tag: ParagraphTag.Description,
        text: "Une très haute porte conduit à l'intérieur.",
      },
      {
        tag: ParagraphTag.Information,
        text: '(à suivre...)',
      },
    ];
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.South,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
          .getId(),
        text: "Le pont rejoint le second plateau, de l'autre côté du ravin.",
        distance: 20,
      },
    ];
  }
}
