import { Gender } from 'src/game/core/dictionnaries/Gender';
import { ConjugationTime } from 'src/game/core/models/Glossary';
import { Play } from 'src/game/core/models/Play';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Person } from './../../game/core/models/Glossary';
import { AUDIOS } from './audios';
import { ENTITY_CONSTRUCTORS } from './entityConstructors';
import { IMAGES } from './images';
import { Sword } from './models/objects/Sword';
import { ModifiedFrenchBaseGlossary } from './ModifiedFrenchBaseGlossary';

export class TestScenario extends BaseScenario {
  static entityConstructors = ENTITY_CONSTRUCTORS;

  static images = IMAGES;
  static audios = AUDIOS;

  constructor() {
    super('test', {
      entityConstructors: TestScenario.entityConstructors,
      glossaries: {
        fr: new ModifiedFrenchBaseGlossary(),
      },
      images: TestScenario.images,
      audios: TestScenario.audios
    });

    // TODO: move
    this.glossaryConfiguration = {
      conjugationTime: ConjugationTime.Present,
      receiverGender: Gender.Male,
      receiverPerson: Person.SecondPersonPlural,
    };
  }

  starting = {
    maxSpells: 2,
    caracteristicsPoints: 5,
    availableSpells: [
      TestScenario.entityConstructors.DestructionSpell.name,
      TestScenario.entityConstructors.IllusionSpell.name,
      TestScenario.entityConstructors.InvocationSpell.name,
    ],
    askForName: false,
  };

  getTitle() {
    return 'Test';
  }

  init(play: Play) {
    const player = play.addEntity(
      this.entityConstructors.Jean.name
    ) as Character;
    const chamber = play.getFirstEntityOfType(
      this.entityConstructors.Chamber.name
    ) as Place;

    player.moveTo(chamber);

    for (let i = 0; i < 4; i++) {
      (play.addEntity(this.entityConstructors.Sword.name) as Sword).moveTo(
        player
      );
    }

    this.createConnection(play, {
      first: {
        placeType: TestScenario.entityConstructors.Chamber.name,
        text: 'a scale leads to a door',
      },
      second: {
        placeType: TestScenario.entityConstructors.Corridor.name,
        text: 'a door at the end of the corridor',
      },
      connectionType: TestScenario.entityConstructors.Door.name,
      directionKeyForFirst: DirectionKeys.North,
      distance: 10,
    });

    // entities.player.moveTo(entities.chamber);
    // entities.box.moveTo(entities.chamber);
    // entities.hemlet.moveTo(entities.chamber);
    // entities.boots.moveTo(entities.box);

    // (entities.player as Character).giveSpellOfType(
    //   entityConstructors.DestructionSpell.name,
    //   true
    // );
    // (entities.player as Character).giveEffectOfType(
    //   entityConstructors.PoisonEffect.name,
    //   true
    // );

    play.setPlayer(player);
  }

  start(play: Play): void {
    // play.inform([
    //   {
    //     text: {
    //       fr:
    //         "L'histoire de " +
    //         TextManager.extractName(play.getPlayer().getName()).printSimple() +
    //         ' commence ici',
    //     },
    //   },
    // ]);
  }

  update(play: Play): void {}
}
