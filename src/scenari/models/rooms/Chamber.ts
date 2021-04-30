import { PoisonEffect } from './../effects/PoisonEffect';
import { Name } from '../../../game/models/Name';
import { entityConstructors } from '../../TestScenario';
import { GameController } from '../../../game/GameController';
import { Room } from '../../../game/models/entity/Room';
import { EntityId } from 'src/game/models/Entity';

export class Chamber extends Room {
  fire: boolean = false;

  constructor() {
    super();
  }

  getName() {
    return { fr: new Name('Chamber') };
  }

  getActions() {
    return [
      {
        text: { fr: 'go to corridor' },
        proceed: () => {
          const corridor = GameController.getFirstEntityOfType(
            entityConstructors.Corridor.name
          );
          GameController.getPlayer().moveTo(corridor);
        },
      },
      {
        text: { fr: 'set fire' },
        proceed: () => {
          // this.fire = true;
          GameController.getPlayer().giveSpellOfType(
            entityConstructors.InvocationSpell.name,
            true
          );
        },
        condition: () => {
          return !this.fire;
        },
      },
    ];
  }

  getResponseToSpell(spell: EntityId) {
    let response = null;

    switch (spell) {
      case entityConstructors.DestructionSpell.name: {
        response = () => {
          GameController.inform([{ text: { en: 'destroy all' } }]);
        };
        break;
      }
    }

    return response;
  }
}
