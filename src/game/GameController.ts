import { Utils } from 'src/game/Utils';
import { EntityId } from 'src/game/models/Entity';
import { Paragraph } from './models/Paragraph';
import { Action } from './models/Action';
import { Scenario } from './models/Scenario';
import { TestScenario } from '../scenari/TestScenario';
import { GameService } from './../app/services/game.service';
import { Entity, StoredEntity, EntityType } from './models/Entity';
import { Play } from './models/Play';
import { Character } from './models/entity/Character';

export class GameController {
  static gameService: GameService;
  static play: Play;
  static scenario: Scenario;

  static init(gameService: GameService): void {
    this.gameService = gameService;
    this.scenario = new TestScenario(); // TODO: move
  }

  static inform(paragraphs: Paragraph[], actions?: Action[]) {
    this.gameService.inform(paragraphs, actions);
  }

  static startNewPlay(): void {
    this.setPlay(new Play());

    // TODO: move
    const entities: { [key: string]: Entity } = this.scenario.init();
    for (let key in entities) {
      GameController.storeEntity(entities[key]);
    }

    this.gameService.emitPlay();
    this.savePlay();
  }

  static savePlay(): void {
    this.gameService.savePlay();
  }

  static loadLastPlay(): void {
    this.gameService.loadLastPlay().then((result: Play) => {});
  }

  static getPlay(): Play {
    return this.play;
  }

  static setPlay(play: Play): void {
    this.play = play;
    // this.gameService.emitPlay();
  }

  static setPlayer(entity: Entity): void {
    this.getPlay().playerId = entity.getId();
    this.gameService.emitPlayer();
  }

  static getPlayer(): Character {
    let player: Character = null;

    if (this.getPlay()) {
      player = this.getEntity(this.getPlay().playerId) as Character;
    }

    return player;
  }

  static narrate(paragraphs: string[]): void {
    this.play.narration.sections.push(paragraphs);
  }

  static useAction(action: Action): void {
    action.proceed();

    console.log(action);

    this.play.time += action.duration !== undefined ? action.duration : 1;
    this.savePlay();
  }

  static playerOwns(id: EntityId): boolean {
    return this.getEntity(id).parentId === this.getPlayer().getId();
  }

  static getPlayersLocation(): Entity {
    return this.getEntity(this.getPlayer().parentId);
  }

  static createEntityOfType(type: EntityType): Entity {
    const newEntity = new this.scenario.entityConstructors[type]();
    this.storeEntity(newEntity);

    return newEntity;
  }

  static storeEntity(entity: Entity): void {
    const stored = {};

    Object.getOwnPropertyNames(entity).forEach((item) => {
      stored[item] = entity[item];
    });

    this.play.storedEntities[entity.getId()] = stored as StoredEntity;

    this.savePlay();
  }

  static getFirstEntityOfType(
    type: EntityType,
    createIfNotExists = true
  ): Entity {
    let foundId: string = null;
    let entity = null;

    for (let id in this.play.storedEntities) {
      if (this.play.storedEntities[id].type === type) {
        foundId = id;
      }
    }

    if (!foundId && createIfNotExists) {
      const newEntity = this.createEntityOfType(type);
      foundId = newEntity.getId();
    }

    if (foundId) {
      entity = this.getEntity(foundId);
    }

    return entity;
  }

  static getEntity(id: string): Entity {
    const stored = this.play.storedEntities[id];
    let entity = null;

    if (stored) {
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
    } else {
      console.error('Entity not found (id: ' + id + ')');
    }

    return entity;
  }
}
