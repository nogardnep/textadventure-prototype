import { InvocationSpell } from './models/spells/InvocationSpell';
import { IllusionSpell } from './models/spells/IllustionSpell';
import { GameController } from '../game/GameController';
import { caracteristicKeys } from './../game/models/Caracteristic';
import { Scenario } from './../game/models/Scenario';
import { Player } from './models/characters/Player';
import { PoisonEffect } from './models/effects/PoisonEffect';
import { Boots } from './models/objects/Boots';
import { Helmet } from './models/objects/Helmet';
import { Chamber } from './models/rooms/Chamber';
import { Corridor } from './models/rooms/Corridor';
import { DestructionSpell } from './models/spells/DestructionSpell';

export const entityConstructors = {
  Chamber,
  Corridor,
  Player,
  Helmet,
  Boots,
  DestructionSpell,
  PoisonEffect,
  IllusionSpell,
  InvocationSpell
};

export class TestScenario implements Scenario {
  entityConstructors = entityConstructors;

  init() {
    const entities = {
      player: new entityConstructors.Player(),
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

    // const entities = {
    //   player: new Character({
    //     name: 'Nik',
    //     interiorDescription: 'qfdsfs dqdf',
    //   }),
    //   chamber: new Room({
    //     name: 'Chamber',
    //     interiorDescription: 'a red chamber',
    //   }),
    //   corridor: new Room({
    //     name: 'Corridor',
    //   }),
    //   key: new UsableObject({
    //     exteriorDescription: 'a golden key',
    //     name: 'Key',
    //   }),
    //   box: new UsableObject({
    //     name: 'Box',
    //   }),
    //   chamberDoor: new Door(),
    // };

    // entities.key.moveTo(entities.chamber);
    // entities.player.moveTo(entities.chamber);

    // entities.chamber.exits = [
    //   {
    //     text: 'a door at the north',
    //     destination: entities.corridor.getId(),
    //     doorId: entities.chamberDoor.getId(),
    //   },
    // ];

    // entities.corridor.exits = [
    //   {
    //     text: 'a door at the south',
    //     destination: entities.chamber.getId(),
    //     doorId: entities.chamberDoor.getId(),
    //   },
    // ];

    // GameController.setPlayer(entities.player);
    // this.storeAll(entities);
  }
}
