import { Connection, Place } from 'src/game/models/entities/material/Place';
import { Spell } from 'src/game/models/entities/immaterial/Spell';
import { Name } from 'src/game/models/Name';
import { Play } from 'src/game/models/Play';
import { entityConstructors } from '../../TestScenario';
import { DirectionKeys } from 'src/game/dictionnaries/Direction';

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
          this.exitToPlace(entityConstructors.Corridor.name);
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
