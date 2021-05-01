import { TextWrapper } from './models/Text';
import { Narration, StoredNarration } from './models/Narration';
import { EntityId } from 'src/game/models/Entity';
import { TestScenario } from '../scenari/TestScenario';
import { Action } from './models/Action';
import { Entity, EntityType, StoredEntity } from './models/Entity';
import { Character } from './models/entity/Character';
import { Paragraph } from './models/Paragraph';
import { Play } from './models/Play';
import { Scenario } from './models/Scenario';

type Callbacks = {
  onInform: (paragraphs: Paragraph[], actions?: Action[]) => void;
  onLoaded: (play: Play) => void;
  onStart: () => void;
  onSave: (play: Play) => void;
};

export class GameController {
  static play: Play;
  static scenario: Scenario;
  private static callbacks: Callbacks;

  static init(callbacks: Callbacks): void {
    this.scenario = new TestScenario(); // TODO: move
    this.callbacks = callbacks;
  }

  static getScenario(): Scenario {
    return this.scenario;
  }

  static inform(paragraphs: Paragraph[], actions?: Action[]) {
    this.callbacks.onInform(paragraphs, actions);
  }

  static interpret(prompt: string): void {
    let response: TextWrapper;

    if (!response) {
      response = { en: '(nothing happens) ' };
    }

    GameController.getNarration().addSection({
      title: { fr: prompt },
      paragraphs: [{
        text: response
      }],
    });
  }

  static startNewPlay(player: Character): void {
    this.play = new Play();

    console.log('this.play');
    console.log(this.play);

    const entities: { [key: string]: Entity } = this.scenario.initPlay(player);

    for (let key in entities) {
      this.storeEntity(entities[key]);
    }
    this.savePlay();
    this.callbacks.onLoaded(this.play);
  }

  static savePlay(): void {
    console.log(this.play);
    this.callbacks.onSave(this.play);
  }

  static loadPlay(play: Play): void {
    this.play = play;

    this.callbacks.onLoaded(this.play);
  }

  static getPlay(): Play {
    return this.play;
  }

  static setPlayer(entity: Entity): void {
    this.getPlay().playerId = entity.getId();
  }

  static getPlayer(): Character {
    let player: Character = null;

    if (this.getPlay()) {
      player = this.getEntity(this.getPlay().playerId) as Character;
    }

    return player;
  }

  static narrate(paragraphs: Paragraph[]): void {
    this.getNarration().addSection({ paragraphs });
  }

  static useAction(action: Action): void {
    action.proceed();

    this.play.time += action.duration !== undefined ? action.duration : 1;
    this.savePlay();
  }

  static getPlayersLocation(): Entity {
    return this.getEntity(this.getPlayer().parentId);
  }

  static createEntityOfType(type: EntityType): Entity {
    const newEntity = new this.scenario.entityConstructors[type]();
    this.storeEntity(newEntity);

    return newEntity;
  }

  static storeNarration(narration: Narration): void {
    const stored = {};

    Object.getOwnPropertyNames(narration).forEach((item) => {
      stored[item] = narration[item];
    });

    this.play.narration = stored as StoredNarration;

    this.savePlay();
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

  static getNarration(): Narration {
    const stored = this.play.narration;

    let narration: Narration = null;

    narration = new Narration();
    Object.assign(narration, stored);

    return narration;
  }

  static getEntity(id: string): Entity {
    const stored = this.play.storedEntities[id];
    let entity: Entity = null;

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
