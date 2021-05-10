import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import {
  Connection,
  Place,
} from 'src/game/modules/base/models/entities/material/Place';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { TheFortress } from '../../TheFortress';

export class Bridge extends Place {
  init() {
    this.getGiant().moveTo(this);
  }

  getName() {
    return { fr: new Name('pont') };
  }

  getChoices() {
    return [
      {
        text: { fr: 'attaquer le géant' },
        check: () => {
          return this.giantIsHere();
        },
        proceed: () => {
          this.getPlay().inform([{ text: { fr: 'Vous tuez le géant.' } }]);
          this.killTheGiant();
        },
      },
    ];
  }

  affectedBySpell(author: Character, spell: Spell) {
    let success = false;

    if (
      spell.inheritsFrom(
        TheFortress.entityConstructors.DestructionSpell.name
      ) &&
      this.giantIsHere()
    ) {
      this.getPlay().inform([{ text: { fr: 'Le géant succombe' } }]);
      this.killTheGiant();
      success = true;
    }

    return {success};
  }

  getInteriorDescription() {
    return [
      {
        text: { fr: 'Un géant garde le pont.' },
        check: () => {
          return !this.getGiant().dead;
        },
      },
      {
        text: { fr: 'Un géant gît sur le pont.' },
        check: () => {
          return this.getGiant().dead;
        },
      },
    ];
  }

  connectionUsed(entity: MaterialEntity, connection: Connection) {
    if (entity.isThePlayer() && this.giantIsHere()) {
      this.getPlay().inform([
        { text: { fr: 'Vous ne pouvez passer, le géant garde le pont.' } },
      ]);

      return { success: false };
    } else {
      return super.connectionUsed(entity, connection);
    }
  }

  getConnections() {
    return [
      {
        directionKey: DirectionKeys.North,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.GreatEntry.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
      {
        directionKey: DirectionKeys.South,
        destinationId: this.getPlay()
          .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
          .getId(),
        text: { fr: '' },
        distance: 20,
      },
    ];
  }

  private killTheGiant() {
    this.getGiant().dead = true;
    this.getGiant().save();
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
