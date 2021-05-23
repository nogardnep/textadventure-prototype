import { GameManager } from 'src/game/core/GameManager';
import { Utils } from '../Utils';
import { Choice } from './Choice';
import { Name } from './Name';
import { Paragraph } from './Paragraph';
import { Play } from './Play';

export type EntityId = string;
export type EntityType = string;

export interface StoredEntity {
  id: EntityId;
  type: EntityType;
}

export class Entity implements StoredEntity {
  name: string;
  id: EntityId;
  type: EntityType;
  // protected onGetPlay: () => Play;

  constructor(play: Play) {
    // this.onGetPlay = () => {
    //   return play;
    // };
    this.id = Utils.generateId();
    this.type = this.constructor.name;
  }

  init(): void {}

  update(): void {}

  getStored(): StoredEntity {
    const stored = {};

    Object.getOwnPropertyNames(this).forEach((item) => {
      if (typeof this[item] !== 'function') {
        stored[item] = this[item];
      }
    });

    return stored as StoredEntity;
  }

  save(): void {
    this.getPlay().storeEntity(this);
  }

  getPlay(): Play {
    return GameManager.getPlay();
    // return this.onGetPlay();
  }

  getType(): string {
    return this.type;
  }

  getName(): Name {
    if (this.name) {
      return new Name(this.name);
    } else {
      return null;
    }
  }

  getDisplayedActionKeys(): string[] {
    return [];
  }

  getChoices(): Choice[] {
    return [];
  }

  getResponseToAction(key: string): void {}

  getId(): string {
    return this.id;
  }

  equals(entity: Entity): boolean {
    return this.getId() === entity.getId();
  }

  inheritsFrom(type: EntityType): boolean {
    return (
      this instanceof this.getPlay().getScenario().entityConstructors[type]
    );
  }

  isOfType(type: EntityType): boolean {
    return this.type === type;
  }

  isThePlayer(): boolean {
    return this.equals(this.getPlay().getPlayer());
  }

  inform(paragraphs: Paragraph[], choices?: Choice[]): void {
    if (this.equals(this.getPlay().getPlayer())) {
      this.getPlay().sendMessage(paragraphs, choices);
    }
  }
}
