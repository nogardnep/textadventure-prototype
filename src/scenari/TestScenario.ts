import { InvocationSpell } from './models/spells/InvocationSpell';
import { IllusionSpell } from './models/spells/IllustionSpell';
import { GameController } from '../game/GameController';
import { caracteristicKeys } from '../game/enums/Caracteristic';
import { Scenario } from './../game/models/Scenario';
import { Player } from './models/characters/Player';
import { PoisonEffect } from './models/effects/PoisonEffect';
import { Boots } from './models/objects/Boots';
import { Helmet } from './models/objects/Helmet';
import { Chamber } from './models/rooms/Chamber';
import { Corridor } from './models/rooms/Corridor';
import { DestructionSpell } from './models/spells/DestructionSpell';
import { Character } from 'src/game/models/entity/Character';

export const entityConstructors = {
  Chamber,
  Corridor,
  Player,
  Helmet,
  Boots,
  DestructionSpell,
  PoisonEffect,
  IllusionSpell,
  InvocationSpell,
};

export class TestScenario implements Scenario {
  entityConstructors = entityConstructors;

  starting = {
    maxSpells: 2,
    caracteristicsPoints: 5,
    availableSpells: [
      entityConstructors.DestructionSpell.name,
      entityConstructors.IllusionSpell.name,
      entityConstructors.InvocationSpell.name,
    ],
    askForName: false
  };

  getInitialPlayer(): Character {
    const player = new entityConstructors.Player();
    player.name = 'Jack';
    return player;
  }

  initPlay(player: Player) {
    const entities = {
      player,
      chamber: new entityConstructors.Chamber(),
      hemlet: new entityConstructors.Helmet(),
      boots: new entityConstructors.Boots(),
      destructionSpell: new entityConstructors.DestructionSpell(),
      // poisonEffect: new entityConstructors.PoisonEffect(),
    };

    entities.player.moveTo(entities.chamber);
    entities.hemlet.moveTo(entities.player);
    entities.boots.moveTo(entities.player);
    entities.player.giveSpell(entities.destructionSpell.getId());
    // entities.player.giveEffect(entities.poisonEffect.getId());

    GameController.setPlayer(entities.player);

    console.log(entities.player.getCaracteristicValue(caracteristicKeys.life));

    return entities;
  }
}
