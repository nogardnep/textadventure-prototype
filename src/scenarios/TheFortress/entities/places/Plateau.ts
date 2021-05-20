import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import {
  Connection,
  Place,
} from 'src/game/modules/base/models/entities/material/Place';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { TheFortress } from '../../TheFortress';

export class Plateau extends Place {
  getName() {
    return new Name('plateau');
  }

  getInteriorDescription() {
    return [
      {
        text: 'Un espace dégagé surplombant un ravin.',
      },
      {
        items: [
          {
            text: 'La forteresse',
            entity: this.getPlay().getFirstEntityOfType(
              TheFortress.entityConstructors.Fortress.name
            ),
          },
          { text: " est de l'autre côté sur un aute plateau." },
        ],
      },
      {
        text: 'Un long et étroit pont de pierre mène là-bas.',
      },
      // {
      //   text: 'Un géant garde le pont.',
      //   check: () => {
      //     return !this.getGiant().dead;
      //   },
      // },
      // {
      //   text: 'Un géant gît sur le pont.',
      //   check: () => {
      //     return this.getGiant().dead;
      //   },
      // },
    ];
  }

  init() {
    this.getGiant().moveTo(this);
  }

  // getChoices() {
  //   return [
  //     {
  //       text: 'attaquer le géant',
  //       check: () => {
  //         return this.giantIsHere();
  //       },
  //       proceed: () => {
  //         this.getPlay().inform([{ text: 'Vous tuez le géant.' }]);
  //         this.killTheGiant();
  //       },
  //     },
  //   ];
  // }

  affectedBySpell(author: Character, spell: Spell) {
    let report = { success: false };

    if (
      spell.inheritsFrom(
        TheFortress.entityConstructors.DestructionSpell.name
      ) &&
      this.giantIsHere()
    ) {
      this.getPlay().inform([
        { text: 'Le géant succombe sous un déluge de flammes.' },
      ]);
      this.getGiant().kill();
      report.success = true;
    } else {
      report = super.affectedBySpell(author, spell);
    }

    return report;
  }

  connectionUsed(author: MaterialEntity, connection: Connection) {
    if (
      author.isThePlayer() &&
      this.connectionLeadsTo(
        connection,
        TheFortress.entityConstructors.GreatEntry.name
      ) &&
      this.giantIsHere()
    ) {
      this.getPlay().inform([
        { text: 'Vous ne pouvez passer, le géant garde le pont.' },
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
        text: "Le pont mène devant l'entrée de la forteresse.",
        distance: 20,
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

  private giantIsHere(): boolean {
    return this.isOwning(this.getGiant(), true) && !this.getGiant().dead;
  }

  private getGiant(): Character {
    return this.getPlay().getFirstEntityOfType(
      TheFortress.entityConstructors.Giant.name,
      true
    ) as Character;
  }
}
