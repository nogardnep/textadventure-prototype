import { Passage } from 'src/game/modules/base/models/entities/material/thing/Passage';
import { EntityType } from 'src/game/core/models/Entity';
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

// TODO: delete
export class Bridge extends Passage {

  // getName() {
  //   return new Name('pont');
  // }

  // getInteriorDescription() {
  //   return [
  //     {
  //       text: 'Un pont de pierre relie '
  //     }
  //     // {
  //     //   text: 'Un géant garde le pont.',
  //     //   check: () => {
  //     //     return !this.getGiant().dead;
  //     //   },
  //     // },
  //     // {
  //     //   text: 'Un géant gît sur le pont.',
  //     //   check: () => {
  //     //     return this.getGiant().dead;
  //     //   },
  //     // },
  //   ];
  // }

  init() {
    // this.getGiant().moveTo(this);
  }

  // // getChoices() {
  // //   return [
  // //     {
  // //       text: 'attaquer le géant',
  // //       check: () => {
  // //         return this.giantIsHere();
  // //       },
  // //       proceed: () => {
  // //         this.getPlay().inform([{ text: 'Vous tuez le géant.' }]);
  // //         this.killTheGiant();
  // //       },
  // //     },
  // //   ];
  // // }

  // affectedBySpell(author: Character, spell: Spell) {
  //   let success = false;

  //   if (
  //     spell.inheritsFrom(
  //       TheFortress.entityConstructors.DestructionSpell.name
  //     ) &&
  //     this.giantIsHere()
  //   ) {
  //     this.getPlay().inform([{ text: 'Le géant succombe' }]);
  //     this.killTheGiant();
  //     success = true;
  //   }

  //   return { success };
  // }

  // connectionUsed(entity: MaterialEntity, connection: Connection) {
  //   if (
  //     entity.isThePlayer() &&
  //     this.connectionLeadsTo(
  //       connection,
  //       TheFortress.entityConstructors.GreatEntry.name
  //     ) &&
  //     this.giantIsHere()
  //   ) {
  //     this.getPlay().inform([
  //       { text: 'Vous ne pouvez passer, le géant garde le pont.' },
  //     ]);
  //     return { success: false };
  //   } else {
  //     return super.connectionUsed(entity, connection);
  //   }
  // }

  // getConnections() {
  //   return [
  //     {
  //       directionKey: DirectionKeys.North,
  //       destinationId: this.getPlay()
  //         .getFirstEntityOfType(TheFortress.entityConstructors.GreatEntry.name)
  //         .getId(),
  //       text: '',
  //       distance: 20,
  //     },
  //     {
  //       directionKey: DirectionKeys.South,
  //       destinationId: this.getPlay()
  //         .getFirstEntityOfType(TheFortress.entityConstructors.Plateau.name)
  //         .getId(),
  //       text: '',
  //       distance: 20,
  //     },
  //   ];
  // }

  // private killTheGiant() {
  //   this.getGiant().dead = true;
  //   this.getGiant().save();
  // }

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
