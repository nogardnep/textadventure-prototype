import { GameController } from 'src/game/GameController';
import { Character } from 'src/game/models/entities/Character';
import { Play } from 'src/game/models/Play';
import { Scenario } from 'src/game/models/Scenario';
import { TextManager } from 'src/game/TextManager';
import { Jean } from './models/characters/Jean';
import { Tom } from './models/characters/Tom';
import { PoisonEffect } from './models/effects/PoisonEffect';
import { Boots } from './models/objects/Boots';
import { Box } from './models/objects/Box';
import { Helmet } from './models/objects/Helmet';
import { Shield } from './models/objects/Shield';
import { Sword } from './models/objects/Sword';
import { Chamber } from './models/rooms/Chamber';
import { Corridor } from './models/rooms/Corridor';
import { DestructionSpell } from './models/spells/DestructionSpell';
import { IllusionSpell } from './models/spells/IllustionSpell';
import { InvocationSpell } from './models/spells/InvocationSpell';

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
};

export class TestScenario implements Scenario {
  id = 'test';

  entityConstructors = entityConstructors;

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
    const player = play.addEntity(
      entityConstructors.Jean.name
    ) as Character;

    player.moveTo(play.addEntity(entityConstructors.Chamber.name));

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

  start(): void {
    GameController.inform([
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
}
