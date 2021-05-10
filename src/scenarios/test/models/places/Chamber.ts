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
    const tom = this.getPlay().addEntity(
      TestScenario.entityConstructors.Tom.name
    ) as Character;
    tom.moveTo(this);

    // this.giveChildOfType(TestScenario.entityConstructors.Tom.name, false);
  }

  // getFullImages() {
  //   return [
  //     { image: TestScenario.images.sky },
  //     { image: TestScenario.images.castle1Full },
  //   ];
  // }

  // getAudioAmbiance() {
  //   return [
  //     { audio: TestScenario.audios.birds },
  //     { audio: TestScenario.audios.ghost },
  //   ];
  // }

  getInteriorDescription() {
    return [
      {
        items: [
          { text: { fr: 'Une grande pièce aux murs rouges.' } },
          {
            text: { fr: 'Un homme' },
            entity: this.getPlay().getFirstEntityOfType(
              TestScenario.entityConstructors.Tom.name
            ),
          },
          { text: { fr: '.' } },
        ],
      },
      // {
      //   text: {
      //     fr: [
      //       { text: 'Une grande pièce aux murs rouges. ' },
      //       {
      //         text: 'Un homme',
      //         entity: this.getPlay().getFirstEntityOfType(
      //           TestScenario.entityConstructors.Tom.name
      //         ),
      //       },
      //       { text: ' ici.' },
      //     ],
      //   },
      // },
    ];
    // return [{ text: { fr: 'Une grande pièce aux murs rouges.' } }];
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
          this.fire = true;
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

  affectedBySpell(spell: Spell) {
    let response = null;

    // switch (spell.getType()) {
    //   case TestScenario.entityConstructors.DestructionSpell.name: {
    //     response = () => {
    //       this.getPlay().inform([{ text: { en: 'destroy all' } }]);
    //     };
    //     break;
    //   }
    // }

    return response;
  }
}
