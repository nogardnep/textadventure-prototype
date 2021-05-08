import { Character } from 'src/game/models/entities/material/Character';
import { Entity, EntityType } from 'src/game/models/Entity';
import { TextManager } from 'src/game/TextManager';
import { BASE_ACTIONS } from '../dictionnaries/Actions';
import {
  BASE_DIRECTIONS,
  Direction,
  DirectionKey,
  getOppositeDirection,
} from '../dictionnaries/Direction';
import { Action } from './Action';
import { BaseGlossary } from './BaseGlossary';
import { Choice } from './Choice';
import {
  Connection,
  DEFAULT_DISTANCE,
  DEFAULT_SPEED,
  Place,
} from './entities/material/Place';
import { MaterialEntity } from './entities/MaterialEntity';
import { EntityId, StoredEntity } from './Entity';
import { FrenchBaseGlossary } from './FrenchBaseGlossary';
import { Glossary, Person, Time } from './Glossary';
import { Narration, StoredNarration } from './Narration';
import { Paragraph } from './Paragraph';
import { Scenario, ScenarioId } from './Scenario';
import { TextWrapper } from './Text';

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

const BASE_GLOSSARIES = {
  fr: new FrenchBaseGlossary(),
};

export class Play {
  private entities: { [id: string]: Entity };
  private player: Character;
  private narration: Narration;
  private time: number;
  private scenario: Scenario;
  private stored: StoredPlay;
  private callbacks: PlayCallBacks;
  private directions: { [key: string]: Direction };
  private entityConstructors: { [key: string]: new (play: Play) => Entity };
  private glossaries: { [languageKey: string]: BaseGlossary };
  private actions: { [actionKey: string]: Action };
  // private actions: { [key: string]: ActionOld };

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
    // this.actions = Object.assign({}, BASE_ACTIONS, scenario.actions);
    this.actions = Object.assign({}, BASE_ACTIONS, scenario.actions);
    this.directions = Object.assign({}, BASE_DIRECTIONS, scenario.directions);
    this.entityConstructors = Object.assign({}, scenario.entityConstructors);

    this.glossaries = Object.assign({}, BASE_GLOSSARIES, scenario.glossaries);

    Glossary.setPerson(Person.SecondPersonPlural);
    Glossary.setTime(Time.Present);
  }

  init(): void {
    this.scenario.init(this);
    this.narration.save();
    this.storePlayer();
    this.storeTime();
  }

  start(): void {
    this.scenario.update(this);
  }

  update(): void {
    for (let key in this.entities) {
      this.entities[key].update();
    }

    this.scenario.update(this);
  }

  load(storedPlay: StoredPlay): void {
    this.stored = storedPlay;

    for (let id in storedPlay.storedEntities) {
      let entity: Entity = null;
      const storedEntity = storedPlay.storedEntities[id];
      const constructor = this.entityConstructors[storedEntity.type];

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

  getGlossary(): BaseGlossary {
    return TextManager.extract(this.glossaries);
  }

  addEntity(type: EntityType): Entity {
    const constructor = this.entityConstructors[type];
    const entity = new constructor(this);
    this.entities[entity.getId()] = entity;
    entity.init();
    entity.save();

    return entity;
  }

  createConnection(param: {
    first: {
      placeType: EntityType;
      text: TextWrapper;
    };
    second: {
      placeType: EntityType;
      text: TextWrapper;
    };
    connectionType?: EntityType;
    directionKeyForFirst?: DirectionKey;
    distance?: number;
  }): void {
    const firstPlace = this.getFirstEntityOfType(
      param.first.placeType
    ) as Place;

    const secondPlace = this.getFirstEntityOfType(
      param.second.placeType
    ) as Place;

    let connection: Entity;

    if (param.connectionType) {
      connection = this.addEntity(param.connectionType);
    }

    firstPlace.addConnection({
      destinationId: secondPlace.getId(),
      text: param.first.text,
      directionKey: param.directionKeyForFirst,
      distance: param.distance,
      passageId: connection.getId(),
    });

    secondPlace.addConnection({
      destinationId: firstPlace.getId(),
      text: param.second.text,
      directionKey: getOppositeDirection(param.directionKeyForFirst),
      distance: param.distance,
      passageId: connection.getId(),
    });
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
    Glossary.setGender(entity.getGender());
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
    this.update();
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

  getDirection(key: DirectionKey): Direction {
    return this.directions[key];
  }

  // TODO: move
  useConnection(connection: Connection): void {
    this.player.moveTo(
      this.getEntity(connection.destinationId) as MaterialEntity
    );
    this.increaseTime(
      (connection.distance ? connection.distance : DEFAULT_DISTANCE) *
        DEFAULT_SPEED
    );
  }

  getAction(key: string): Action {
    const action = this.actions[key];

    if (!action) {
      console.error('Action "' + key + '" not found');
    }

    return action;
  }
}
