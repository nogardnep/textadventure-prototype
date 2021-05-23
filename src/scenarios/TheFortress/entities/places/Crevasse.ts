import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { TheFortress } from '../../TheFortress';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

export class Crevasse extends Place {
  getName() {
    return new Name('crevasse', { feminin: true });
  }

  getInteriorDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        items: [
          {
            text: 'Bas sous le pont de pierre qui relie le plateau à ',
          },
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
        items: [
          {
            text: 'Un torrent',
            entity: this.getPlay().getFirstEntityOfType(
              TheFortress.entityConstructors.Torrent.name
            ),
          },
          { text: 'longe la falaise où elle est perchée.' },
        ],
      },
      {
        tag: ParagraphTag.Description,
        text: "De l'autre côté semle se trouver l'entrée d'une caverne.",
      },
    ];
  }

  affectedBySpell(author: Character, spell: Spell) {
    let success = false;

    if (spell.inheritsFrom(TheFortress.entityConstructors.ControlSpell.name)) {
      this.getPlay().sendMessage([
        {
          tag: ParagraphTag.Event,
          text: 'Vous formez un milieu du torrent un passage où les eaux ne peuvent plus se déverser.',
        },
      ]);
      this.getPlay().sendMessage([
        {
          tag: ParagraphTag.Event,
          text: "Vous rejoignez ainsi l'autre rive.",
        },
      ]);

      success = true;
    }
    this.rejoinOtherBank();

    return { success };
  }

  getConnections() {
    return [
      // {
      //   directionKey: DirectionKeys.North,
      //   destinationId: this.getPlay()
      //     .getFirstEntityOfType(
      //       TheFortress.entityConstructors.SecreteEntry.name
      //     )
      //     .getId(),
      //   text: "dans la parois de la falaise se trouve l'entrée d'une caverne",
      //   distance: 20,
      // },
      {
        directionKey: DirectionKeys.West,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
          .getId(),
        text: 'un escalier naturel monte abruptement vers le plateau',
        distance: 20,
      },
    ];
  }

  private rejoinOtherBank(): void {
    (this.getPlay().getPlayer() as Character).moveTo(
      this.getPlay().getFirstEntityOfType(
        TheFortress.entityConstructors.SecreteEntry.name
      ) as Place
    );
  }
}
