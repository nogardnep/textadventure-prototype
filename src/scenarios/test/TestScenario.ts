import { Tom } from './models/characters/Tom';
import { Play } from 'src/game/models/Play';
import { Entity } from 'src/game/models/Entity';
import { Box } from './models/objects/Box';
import { InvocationSpell } from './models/spells/InvocationSpell';
import { IllusionSpell } from './models/spells/IllustionSpell';
import { Jean } from './models/characters/Jean';
import { PoisonEffect } from './models/effects/PoisonEffect';
import { Boots } from './models/objects/Boots';
import { Helmet } from './models/objects/Helmet';
import { Chamber } from './models/rooms/Chamber';
import { Corridor } from './models/rooms/Corridor';
import { DestructionSpell } from './models/spells/DestructionSpell';
import { Character } from 'src/game/models/entities/Character';
import { Scenario } from 'src/game/models/Scenario';
import { GameController } from 'src/game/GameController';

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

  getInitialPlayer(): Character {
    const player = new entityConstructors.Jean();
    player.name = 'Jack';
    return player;
  }

  init(play: Play) {
    const entities: { [key: string]: Entity } = {
      player: new entityConstructors.Jean(),
      chamber: new entityConstructors.Chamber(),
      hemlet: new entityConstructors.Helmet(),
      boots: new entityConstructors.Boots(),
      destructionSpell: new entityConstructors.DestructionSpell(),
      box: new entityConstructors.Box(),
      // poisonEffect: new entityConstructors.PoisonEffect(),
    };

    for (let item in entities) {
      play.addEntity(entities[item]);
    }

    entities.player.moveTo(entities.chamber);
    entities.box.moveTo(entities.chamber);
    entities.hemlet.moveTo(entities.chamber);
    entities.boots.moveTo(entities.box);
    (entities.player as Character).giveSpell(entities.destructionSpell.getId());
    // entities.player.giveEffect(entities.poisonEffect.getId());

    // GameController.setPlayer(entities.player);

    play.setPlayer(entities.player as Character);

    for (let item in entities) {
      entities[item].save();
    }

    return entities;
  }

  start(): void {
    // GameController.inform([
    //   {
    //     text: {
    //       fr:
    //         'Vous, ' +
    //         GameController.getPlay().getPlayer().getName().fr +
    //         ", commencez l'histoire comment ici",
    //     },
    //   },
    // ]);
  }
}
