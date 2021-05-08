import { Play } from './Play';
import { Choice } from './Choice';
import { Image } from './Image';
import { Name } from './Name';
import { Paragraph } from './Paragraph';
import { NameWrapper } from './Text';

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
  protected onGetPlay: () => Play;

  constructor(play: Play) {
    this.onGetPlay = () => {
      return play;
    };
    this.id = Math.floor(Math.random() * 1000).toString();
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
    return this.onGetPlay();
  }

  getType(): string {
    return this.type;
  }

  getName(): NameWrapper {
    return { fr: new Name(this.name) };
  }

  getExteriorDescription(): Paragraph[] {
    return [];
  }

  getInteriorDescription(): Paragraph[] {
    return [];
  }

  getPreviewDescription(): Paragraph[] {
    return [];
  }

  getDisplayedActionKeys(): string[] {
    return [];
  }

  getPreviewImage(): Image {
    return null;
  }

  getFullImage(): Image {
    return null;
  }

  getChoices(additionnal?: Choice[]): Choice[] {
    return additionnal ? additionnal : [];
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
}
