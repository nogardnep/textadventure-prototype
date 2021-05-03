import { EntityId } from 'src/game/models/Entity';
import { Play } from 'src/game/models/Play';
import { Place } from 'src/game/models/entities/Place';
import { Name } from 'src/game/models/Name';
import { entityConstructors } from '../../TestScenario';
import { Spell } from 'src/game/models/entities/Spell';

export class Chamber extends Place {
  fire: boolean = false;

  constructor(play: Play) {
    super(play);
  }

  init() {
    this.giveChildOfType(entityConstructors.Tom.name, false);
  }

  getName() {
    return { en: new Name('Chamber'), fr: new Name('Chambre') };
  }

  getChoices() {
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
          this.getPlay()
            .getPlayer()
            .giveSpellOfType(entityConstructors.InvocationSpell.name, true);
          this.getPlay()
            .getPlayer()
            .giveEffectOfType(entityConstructors.PoisonEffect.name, true);
        },
        condition: () => {
          return !this.fire;
        },
      },
    ];
  }

  getResponseToSpell(spell: Spell) {
    let response = null;

    switch (spell.getType()) {
      case entityConstructors.DestructionSpell.name: {
        response = () => {
          this.getPlay().inform([{ text: { en: 'destroy all' } }]);
        };
        break;
      }
    }

    return response;
  }
}
