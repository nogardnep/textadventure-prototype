import { GameController } from 'src/game/GameController';
import { Entity, EntityType } from 'src/game/models/Entity';
import { Character } from 'src/game/models/entities/Character';
import { EntityId, StoredEntity } from './Entity';
import { Narration, StoredNarration } from './Narration';
import { Scenario, ScenarioId } from './Scenario';

export interface StoredPlay {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: StoredNarration;
  time: number;
  scenarioId: ScenarioId;
}

export class Play {
  private entities: { [id: string]: Entity };
  private player: Character;
  private narration: Narration;
  private time: number;
  private scenario: Scenario;
  private stored: StoredPlay;

  constructor(scenario: Scenario) {
    this.stored = {
      narration: null,
      playerId: null,
      storedEntities: {},
      time: null,
      scenarioId: null,
    };

    this.entities = {};
    this.player = null;
    this.narration = new Narration();
    this.scenario = scenario;
    this.time = 0;

    this.stored.scenarioId = this.scenario.id;
  }

  init(): void {
    this.scenario.init(this);
    this.narration.save();
    this.storePlayer();
    this.storeTime();
  }

  load(storedPlay: StoredPlay): void {
    this.stored = storedPlay;

    for (let id in storedPlay.storedEntities) {
      let entity: Entity = null;
      const storedEntity = storedPlay.storedEntities[id];

      const constructor = this.scenario.entityConstructors[storedEntity.type];

      if (constructor) {
        entity = new constructor();

        // TODO
        // Utils.assignWithModel(entity, stored);
        Object.assign(entity, storedEntity);
      } else {
        console.error(
          storedEntity.type + ' constructor not found (check in the list)'
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

  getStored(): StoredPlay {
    return this.stored;
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

  setPlayer(entity: Character): void {
    this.player = entity;
    this.storePlayer();
  }

  getPlayer(): Character {
    return this.player;
  }

  getTime(): number {
    return this.time;
  }

  setTime(time: number): void {
    this.time = time;
    this.storeTime();
  }

  getNarration(): Narration {
    return this.narration;
  }

  increaseTime(duration: number): void {
    this.time += duration;
    this.storeTime();
  }

  storeEntity(entity: Entity): void {
    this.stored.storedEntities[entity.getId()] = entity.getStored();
    this.save();
  }

  storeNarration(): void {
    this.stored.narration = this.narration.getStored()
    this.save();
  }

  storePlayer(): void {
    this.stored.playerId = this.player.getId();
    this.save();
  }

  storeTime(): void {
    this.stored.time = this.time;
    this.save();
  }

  save(): void {
    GameController.savePlay();
  }
}
