import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import {
  Connection,
  Place,
} from 'src/game/modules/base/models/entities/material/Place';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { TheFortress } from '../../TheFortress';
import { Bridge } from './../passages/Bridge';

export class Plateau extends Place {
  getName() {
    return new Name('plateau');
  }

  getFullDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'Un espace dégagé surplombant un ravin.',
      },
      {
        tag: ParagraphTag.Description,
        items: [
          {
            text: 'La forteresse',
            entity: this.getPlay().getFirstEntityOfType(
              TheFortress.entityConstructors.Fortress.name
            ),
          },
          { text: " est de l'autre côté, sur un autre plateau." },
        ],
      },
    ];
  }

  getAudioAmbiance() {
    super.getAudioAmbiance;
    return [
      { audio: TheFortress.audios.mountain },
      { audio: TheFortress.audios.rapid, volume: 0.5 },
    ];
  }

  affectedBySpell(author: Character, spell: Spell) {
    let report = { success: false };

    if (
      spell.inheritsFrom(
        TheFortress.entityConstructors.DestructionSpell.name
      ) &&
      this.getBridge().isKept()
    ) {
      this.getPlay().sendMessage([
        {
          tag: ParagraphTag.Event,
          text: 'Le géant succombe sous un déluge de flammes.',
        },
      ]);
      this.getBridge().getGiant().kill();
      report.success = true;
    } else {
      report = super.affectedBySpell(author, spell);
    }

    return report;
  }

  connectionUsed(author: MaterialEntity, connection: Connection) {
    const passage = this.getPassageFor(connection);

    if (
      passage &&
      passage.equals(this.getBridge()) &&
      this.getBridge().isKept()
    ) {
      this.getPlay().sendMessage([
        {
          tag: ParagraphTag.Information,
          text: 'Vous ne pouvez passer, le géant garde le pont.',
        },
      ]);
      return { success: false };
    } else {
      return super.connectionUsed(author, connection);
    }
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.North,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.GreatEntry.name)
          .getId(),
        distance: 20,
        passageId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Bridge.name)
          .getId(),
      },
      {
        directionKey: DirectionKeys.South,
        destinationId: this.getPlay()
          .getFirstEntityOfType(
            TheFortress.entityConstructors.MountainousPath.name
          )
          .getId(),
        text: "Un sentier s'enfonce dans la montagne.",
        distance: 20,
      },
      {
        directionKey: DirectionKeys.East,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Crevasse.name)
          .getId(),
        text: 'Un chemin étroit descend à pic du plateau vers le ravin.',
        distance: 20,
      },
    ];
  }

  private getBridge(): Bridge {
    return this.getPlay().getFirstEntityOfType(
      TheFortress.entityConstructors.Bridge.name,
      true
    ) as Bridge;
  }
}
