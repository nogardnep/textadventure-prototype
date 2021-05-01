import { GameController } from 'src/game/GameController';
import { Entity, EntityType } from 'src/game/models/Entity';
import { Character } from 'src/game/models/entity/Character';
import { EntityId, StoredEntity } from './Entity';
import { Narration, StoredNarration } from './Narration';
import { Scenario } from './Scenario';

export interface StoredPlay {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: StoredNarration;
  time: number;
}

export class Play {
  private entities: { [id: string]: Entity };
  private player: Character;
  private narration: Narration;
  private time: number;
  private scenario: Scenario;

  constructor(scenario: Scenario) {
    this.entities = {};
    this.player = null;
    this.narration = new Narration();
    this.scenario = scenario;
    this.time = 0;
  }

  init(): void {
    this.setTime(0);
    this.scenario.init(this);
    this.narration.save();
    this.savePlayer();
  }

  load(storedPlay: StoredPlay): void {
    for (let id in storedPlay.storedEntities) {
      let entity: Entity = null;
      const stored = storedPlay.storedEntities[id];

      const constructor = this.scenario.entityConstructors[stored.type];

      if (constructor) {
        entity = new constructor();

        // TODO
        // Utils.assignWithModel(entity, stored);
        Object.assign(entity, stored);
      } else {
        console.error(
          stored.type + ' constructor not found (check in the list)'
        );
      }

      this.entities[id] = entity;
    }

    this.player = this.entities[storedPlay.playerId] as Character;
    this.time = storedPlay.time;

    if (storedPlay.narration) {
      this.narration.load(storedPlay.narration);
    }
  }

  getScenario(): Scenario {
    return this.scenario;
  }

  addEntity(entity: Entity): Entity {
    this.entities[entity.getId()] = entity;
    entity.init();
    entity.save();
    return entity;
  }

  addEntityOfType(type: EntityType): Entity {
    const constructor = this.getScenario().entityConstructors[type];
    return this.addEntity(new constructor());
  }

  getEntity(id: EntityId) {
    return this.entities[id];
  }

  getFirstEntityOfType(type: EntityType, createIfNotExists = true): Entity {
    let entity: Entity = null;

    for (let id in this.entities) {
      if (this.entities[id].isOfType(type)) {
        entity = this.entities[id];
      }
    }

    if (!entity && createIfNotExists) {
      entity = this.addEntityOfType(type);
    }

    return entity;
  }

  saveEntity(entity: Entity): void {
    GameController.getStoredPlay().storedEntities[
      entity.getId()
    ] = entity.getStored();
    GameController.savePlay();
  }

  setPlayer(entity: Character): void {
    this.player = entity;
    this.savePlayer();
  }

  savePlayer(): void {
    GameController.getStoredPlay().playerId = this.player.getId();
    GameController.savePlay();
  }

  getPlayer(): Character {
    return this.player;
  }

  getTime(): number {
    return this.time;
  }

  setTime(time: number): void {
    this.time = time;
    this.saveTime();
  }

  saveTime(): void {
    GameController.getStoredPlay().time = this.time;
    GameController.savePlay();
  }

  getNarration(): Narration {
    return this.narration;
  }

  increaseTime(duration: number): void {
    this.time += duration;
    this.setTime(this.time + duration);
  }
}
