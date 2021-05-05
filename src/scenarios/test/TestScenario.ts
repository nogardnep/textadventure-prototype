import { GameController } from 'src/game/GameController';
import { Character } from 'src/game/models/entities/material/Character';
import { Play } from 'src/game/models/Play';
import { Scenario } from 'src/game/models/Scenario';
import { TextManager } from 'src/game/TextManager';
import { DirectionKeys } from 'src/game/dictionnaries/Direction';
import { look } from './actions/look';
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
import { Place } from 'src/game/models/entities/material/Place';

export const entityConstructors = {
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

export class TestScenario implements Scenario {
  id = 'test';

  title = { fr: 'Test' };

  entityConstructors = entityConstructors;

  actions = {
    look,
  };

  starting = {
    maxSpells: 2,
    caracteristicsPoints: 5,
    availableSpells: [
      entityConstructors.DestructionSpell.name,
      entityConstructors.IllusionSpell.name,
      entityConstructors.InvocationSpell.name,
    ],
    askForName: false,
  };

  init(play: Play) {
    const player = play.addEntity(entityConstructors.Jean.name) as Character;
    const chamber = play.getFirstEntityOfType(
      entityConstructors.Chamber.name
    ) as Place;

    player.moveTo(chamber);

    for (let i = 0; i < 4; i++) {
      (play.addEntity(entityConstructors.Sword.name) as Sword).moveTo(player);
    }

    play.createConnection({
      first: {
        placeType: entityConstructors.Chamber.name,
        text: { fr: 'a scale leads to a door' },
      },
      second: {
        placeType: entityConstructors.Corridor.name,
        text: { fr: 'a door at the end of the corridor' },
      },
      passageType: entityConstructors.Door.name,
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
