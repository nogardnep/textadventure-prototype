import { Gender } from 'src/game/core/dictionnaries/Gender';
import { GameController } from 'src/game/core/GameController';
import { ConjugationTime } from 'src/game/core/models/Glossary';
import { Play } from 'src/game/core/models/Play';
import { TextManager } from 'src/game/core/TextManager';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction'
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Person } from './../../game/core/models/Glossary';
import { Jean } from './models/characters/Jean';
import { Tom } from './models/characters/Tom';
import { PoisonEffect } from './models/effects/PoisonEffect';
import { Boots } from './models/objects/Boots';
import { Box } from './models/objects/Box';
import { Helmet } from './models/objects/Helmet';
import { Shield } from './models/objects/Shield';
import { Sword } from './models/objects/Sword';
import { Door } from './models/passages/ChambreDoor';
import { Chamber } from './models/places/Chamber';
import { Corridor } from './models/places/Corridor';
import { DestructionSpell } from './models/spells/DestructionSpell';
import { IllusionSpell } from './models/spells/IllustionSpell';
import { InvocationSpell } from './models/spells/InvocationSpell';
import { ModifiedFrenchBaseGlossary } from './ModifiedFrenchBaseGlossary';

export class TestScenario extends BaseScenario {
  static entityConstructors = {
    Chamber,
    Corridor,
    Jean,
    Helmet,
    Boots,
    DestructionSpell,
    PoisonEffect,
    IllusionSpell,
    InvocationSpell,
    Box,
    Tom,
    Sword,
    Shield,
    Door,
  };

  constructor() {
    super();

    this.id = 'test';
    this.title = { fr: 'Test' };
    this.glossaries = { fr: new ModifiedFrenchBaseGlossary() };
    this.entityConstructors = Object.assign(
      {},
      this.entityConstructors,
      TestScenario.entityConstructors
    );
    this.actions = Object.assign({}, this.actions, {
      // look
    });

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
        text: { fr: 'a scale leads to a door' },
      },
      second: {
        placeType: TestScenario.entityConstructors.Corridor.name,
        text: { fr: 'a door at the end of the corridor' },
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
    play.inform([
      {
        text: {
          fr:
            "L'histoire de " +
            TextManager.extractName(
              GameController.getPlay().getPlayer().getName()
            ).printSimple() +
            ' commence ici',
        },
      },
    ]);
  }

  update(play: Play): void {}
}
