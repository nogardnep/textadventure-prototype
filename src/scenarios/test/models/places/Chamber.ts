import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';
import { Play } from 'src/game/core/models/Play';
import { TestScenario } from '../../TestScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

export class Chamber extends Place {
  fire: boolean = false;

  constructor(play: Play) {
    super(play);
  }

  init() {
    this.giveChildOfType(TestScenario.entityConstructors.Tom.name, false);
  }

  getName() {
    return { en: new Name('Chamber'), fr: new Name('Chambre') };
  }

  // getConnections(): Connection[] {
  //   return [
  //     {
  //       destinationId: this.getPlay()
  //         .getFirstEntityOfType(entityConstructors.Corridor.name, true)
  //         .getId(),
  //       directionKey: DirectionKeys.North,
  //       text: { fr: 'a door' },
  //       distance: 10,
  //       passageId: this.getPlay()
  //         .addEntity(entityConstructors.Door.name)
  //         .getId(),
  //     },
  //   ];
  // }

  getChoices() {
    return [
      {
        text: { fr: 'go to corridor' },
        proceed: () => {
          this.exitToPlace(TestScenario.entityConstructors.Corridor.name);
        },
      },
      {
        text: { fr: 'set fire' },
        proceed: () => {
          // this.fire = true;
          (this.getPlay().getPlayer() as Character).giveSpellOfType(
            TestScenario.entityConstructors.InvocationSpell.name,
            true
          );
          (this.getPlay().getPlayer() as Character).giveEffectOfType(
            TestScenario.entityConstructors.PoisonEffect.name,
            true
          );
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
      case TestScenario.entityConstructors.DestructionSpell.name: {
        response = () => {
          this.getPlay().inform([{ text: { en: 'destroy all' } }]);
        };
        break;
      }
    }

    return response;
  }
}
