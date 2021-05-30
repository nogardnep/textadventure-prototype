import { Utils } from '../Utils';
import { Choice } from './Choice';
import { Name } from './Name';
import { Play } from './Play';

export type EntityId = string;
export type EntityType = string;

export interface StoredEntity {
  id: EntityId;
  type: EntityType;
}

export type EntityGetters = {
  name?: () => Name;
  choices?: () => Choice[];
};

export class Entity {
  private name: string;
  private id: EntityId;
  private type: EntityType;
  private destroyed = false;
  private onGetPlay: () => Play;
  private onGetName: () => Name;
  private onGetChoices: () => Choice[];

  constructor(play: Play) {
    this.onGetPlay = () => {
      return play;
    };
    this.type = this.constructor.name;
    this.id = this.type + '-' + Utils.generateId();
    this.setGetters(this.configure());
  }

  protected configure(): EntityGetters {
    return {};
  }

  protected setGetters(getters: EntityGetters): void {
    this.onGetName = getters.name;
    this.onGetChoices = getters.choices;
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

  destroy(): void {
    this.destroyed = true;
    this.save();
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  save(): void {
    this.getPlay().storeEntity(this);
  }

  getPlay(): Play {
    return this.onGetPlay();
  }

  getType(): string {
    return this.type;
  }

  getName(): Name {
    return this.onGetName
      ? this.onGetName()
      : new Name(this.name ? this.name : '');
  }

  getDisplayedActions(): (string | { key: string; args: any[] })[] {
    return [];
  }

  getChoices(): Choice[] {
    return this.onGetChoices ? this.onGetChoices() : [];
  }

  getResponseToAction(key: string): void {}

  getId(): string {
    return this.id;
  }

  equals(entity: Entity): boolean {
    return this.getId() === entity.getId();
  }

  inheritsFrom(type: EntityType): boolean {
    const constructor = this.getPlay().getScenario().getEntityConstructors()[
      type
    ];

    if (!constructor) {
      console.error('Unfound constructor for ' + type);
    }

    return (
      this instanceof this.getPlay().getScenario().getEntityConstructors()[type]
    );
  }

  isOfType(type: EntityType): boolean {
    return this.type === type;
  }

  isThePlayer(): boolean {
    return this.equals(this.getPlay().getPlayer());
  }
}
