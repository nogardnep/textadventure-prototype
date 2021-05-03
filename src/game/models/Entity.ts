import { ActionKeys, ActionKey } from '../dictionnaries/Actions';
import { Utils } from '../Utils';
import { Play } from './../models/Play';
import { Choice } from './Choice';
import { Spell } from './entities/Spell';
import { Name } from './Name';
import { Paragraph } from './Paragraph';
import { NameWrapper } from './Text';

export type EntityId = string;
export type EntityType = string;

export interface StoredEntity {
  id: EntityId;
  type: EntityType;
  parentId: EntityId;
  childrenId: EntityId[];
}

export class Entity implements StoredEntity {
  protected onGetPlay: () => Play;
  name: string;
  id: EntityId;
  childrenId: EntityId[];
  parentId: EntityId;
  type: EntityType;

  constructor(play: Play) {
    this.onGetPlay = () => {
      return play;
    };
    this.id = Math.floor(Math.random() * 1000).toString();
    this.childrenId = [];
    this.type = this.constructor.name;
    this.parentId = null;
  }

  init(): void {}

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

  getDisplayedActions(a?: ActionKey[], b?: ActionKey[]): ActionKey[] {
    let array: any[] = (a ? a : []).concat(b ? b : []);

    array = Array.from(new Set(array));

    return array;

    return array;
  }

  getChoices(additionnal?: Choice[]): Choice[] {
    return additionnal ? additionnal : [];
  }

  getResponseToAction(key: ActionKeys): void {}

  getResponseToSpell(spell: Spell, additionnal?: {}): {} {
    return additionnal ? additionnal : {};
  }

  getParent(): Entity {
    return this.getPlay().getEntity(this.parentId);
  }

  getChildren(): Entity[] {
    const children: Entity[] = [];

    this.childrenId.forEach((id: EntityId) => {
      children.push(this.getPlay().getEntity(id));
    });

    return children;
  }

  getId(): string {
    return this.id;
  }

  getChildrenId(): EntityId[] {
    return this.childrenId;
  }

  getParentId(): EntityId {
    return this.parentId;
  }

  setParentId(id: EntityId): void {
    this.parentId = id;
  }

  equals(entity: Entity): boolean {
    return this.getId() === entity.getId();
  }

  isOwning(entity: Entity, deepSearch: boolean): boolean {
    let found = false;

    this.getChildren().forEach((item: Entity) => {
      if (item.equals(entity)) {
        found = true;
      } else if (deepSearch) {
        found = item.isOwning(entity, deepSearch);
      }
    });

    return found;
  }

  moveTo(entity: Entity): void {
    const previousParentId = this.parentId;

    if (previousParentId) {
      const previousParent = this.getPlay().getEntity(previousParentId);

      previousParent.childrenId.forEach((item, index) => {
        if (item === this.id) {
          previousParent.childrenId.splice(index, 1);
        }
      });

      previousParent.save();
    }

    if (entity) {
      entity.childrenId.push(this.id);
      entity.save();
    }

    this.parentId = entity.id;
    this.save();

    entity.onVisitedBy(this);
  }

  onVisitedBy(entity: Entity): void {
    // To be override in other classes
  }

  inheritsFrom(type: EntityType): boolean {
    return (
      this instanceof this.getPlay().getScenario().entityConstructors[type]
    );
  }

  isOfType(type: EntityType): boolean {
    return this.type === type;
  }

  giveChildOfType(type: EntityType, doNotCreateNew: boolean): Entity {
    const entity = this.giveEntityOfTypeInList(
      type,
      this.childrenId,
      doNotCreateNew
    );

    if (entity) {
      entity.parentId = this.getId();
    }

    return entity;
  }

  getChildrenOfType(type: EntityType, list: EntityId[]): Entity[] {
    const found: Entity[] = [];

    list.forEach((id: EntityId) => {
      const item = this.getPlay().getEntity(id);

      if (item.inheritsFrom(type)) {
        found.push(item);
      }
    });

    return found;
  }

  protected giveEntityOfTypeInList(
    type: EntityType,
    list: EntityId[],
    doNotCreateNew: boolean
  ): Entity {
    let entity = null;

    if (!doNotCreateNew || this.getChildrenOfType(type, list).length === 0) {
      entity = this.getPlay().addEntity(type);
      this.addToList(entity, list);
    }

    return entity;
  }

  protected addToList(entity: Entity, list: EntityId[]): void {
    list.push(entity.getId());
    this.save();
  }

  protected removeFromList(entity: Entity, list: EntityId[]): void {
    list.forEach((id: EntityId, index: number) => {
      if (id === entity.getId()) {
        list.splice(index, 1);
      }
    });

    this.save();
  }
}
