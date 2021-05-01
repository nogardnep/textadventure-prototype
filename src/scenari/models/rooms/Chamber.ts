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
    return { en: new Name('Chamber'), fr: new Name('Chambre') };
  }

  getActions() {
    return [
      {
        text: { fr: 'go to corridor' },
        proceed: () => {
          this.exitTo(entityConstructors.Corridor.name);
        },
      },
      {
        text: { fr: 'set fire' },
        proceed: () => {
          // this.fire = true;
          GameController.getPlay()
            .getPlayer()
            .giveSpellOfType(entityConstructors.InvocationSpell.name, true);
          GameController.getPlay()
            .getPlayer()
            .giveEffectOfType(entityConstructors.PoisonEffect.name);
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
