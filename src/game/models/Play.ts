import { Character } from 'src/game/models/entities/Character';
import { Entity, EntityType } from 'src/game/models/Entity';
import { Action, ActionKeys, BASE_ACTIONS } from '../dictionnaries/Actions';
import { Choice } from './Choice';
import { EntityId, StoredEntity } from './Entity';
import { Narration, StoredNarration } from './Narration';
import { Paragraph } from './Paragraph';
import { Scenario, ScenarioId } from './Scenario';

export interface StoredPlay {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: StoredNarration;
  time: number;
  scenarioId: ScenarioId;
}

type PlayCallBacks = {
  onSave: () => void;
  onInform: (paragraphs: Paragraph[], actions?: Choice[]) => void;
};

export class Play {
  private entities: { [id: string]: Entity };
  private player: Character;
  private narration: Narration;
  private time: number;
  private scenario: Scenario;
  private stored: StoredPlay;
  private callbacks: PlayCallBacks;
  private actions: { [key: string]: Action };

  constructor(scenario: Scenario, callbacks: PlayCallBacks) {
    this.stored = {
      narration: null,
      playerId: null,
      storedEntities: {},
      time: null,
      scenarioId: null,
    };

    this.callbacks = callbacks;
    this.entities = {};
    this.player = null;
    this.narration = new Narration(this);
    this.scenario = scenario;
    this.time = 0;
    this.stored.scenarioId = this.scenario.id;
    this.actions = Object.assign({}, BASE_ACTIONS, scenario.actions);
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
        entity = new constructor(this);

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

  addEntity(type: EntityType): Entity {
    const constructor = this.getScenario().entityConstructors[type];
    const entity = new constructor(this);
    this.entities[entity.getId()] = entity;
    entity.init();
    entity.save();

    return entity;
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
      entity = this.addEntity(type);
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
    this.stored.narration = this.narration.getStored();
    this.save();
  }

  storePlayer(): void {
    if (this.player) {
      this.stored.playerId = this.player.getId();
      this.save();
    }
  }

  storeTime(): void {
    this.stored.time = this.time;
    this.save();
  }

  save(): void {
    this.callbacks.onSave();
  }

  inform(paragraphs: Paragraph[], actions?: Choice[]): void {
    this.callbacks.onInform(paragraphs, actions);
  }

  getAction(key: ActionKeys): Action {
    const action = this.actions[key];

    if (!action) {
      console.error('Action "' + key + '" not found');
    }

    return action;
  }

  tryAction(key: ActionKeys, ...args: any[]): boolean {
    let success = false;

    if (this.checkAction(key, false, args)) {
      this.executeAction(key, args);
      success = true;
    }

    return success;
  }

  executeAction(key: ActionKeys, args: any[]) {
    if (this.getAction(key)) {
      this.actions[key].proceed(this.player, args);
    }
  }

  checkAction(key: ActionKeys, silently: boolean, args: any[]): boolean {
    let success = false;

    if (this.getAction(key)) {
      let response = this.actions[key].check(this.player, args);

      if (!silently && response.failureMessage) {
        this.inform([{ text: response.failureMessage }]);
      }

      success = response.success;
    }

    return success;
  }
}
