import { Name } from './Name';
import { NameWrapper } from './Text';
import { Paragraph } from './Paragraph';
import { Action } from './Action';
import { Play } from './../models/Play';
import { GameController } from '../GameController';

export type EntityId = string;
export type EntityType = string;

// export interface EntityPresentation {
//   name?: string;
//   interiorDescription?: string;
//   exteriorDescription?: string;
// }

export interface StoredEntity {
  id: EntityId;
  type: EntityType;
  // data: {};
  parentId: EntityId;
  childrenId: EntityId[];
}

export class Entity implements StoredEntity {
  name: string;
  id: EntityId;
  childrenId: EntityId[];
  parentId: EntityId;
  type: EntityType;
  // data: {};
  // presentation: EntityPresentation;

  constructor() {
    this.id = Math.floor(Math.random() * 1000).toString();
    this.childrenId = [];
    this.type = this.constructor.name;
    this.parentId = null;
    // this.data = {};
    // this.presentation = data ? data : {};
  }

  init(): void {}

  getStored(): StoredEntity {
    const stored = {};

    Object.getOwnPropertyNames(this).forEach((item) => {
      stored[item] = this[item];
    });

    return stored as StoredEntity;
  }

  save(): void {
    GameController.getPlay().storeEntity(this);
  }

  getType(): string {
    return this.type;
  }

  getName(): NameWrapper {
    return { fr: new Name(this.name) };
    // return this.presentation.name ? this.presentation.name : '';
  }

  getExteriorDescription(): Paragraph[] {
    return [];
    // return this.presentation.exteriorDescription
    //   ? this.presentation.exteriorDescription
    //   : '';
  }

  getInteriorDescription(): Paragraph[] {
    return [];
    // return this.presentation.interiorDescription
    //   ? this.presentation.interiorDescription
    //   : '';
  }

  getActions(additionnal?: Action[]): Action[] {
    return additionnal ? additionnal : [];
  }

  getResponseToSpell(spell: EntityId, additionnal?: {}): {} {
    return additionnal ? additionnal : {};
  }

  getParent(): Entity {
    return GameController.getPlay().getEntity(this.parentId);
  }

  getChildren(): Entity[] {
    const children: Entity[] = [];

    this.childrenId.forEach((id: EntityId) => {
      children.push(GameController.getPlay().getEntity(id));
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

  // setData(key: string, value: any) {
  //   this.data[key] = value;
  // }

  // getData(key: string): number | string | boolean | {} | [] {
  //   return this.data[key];
  // }

  setParentId(id: EntityId): void {
    this.parentId = id;
  }

  isSameAs(entity: Entity): boolean {
    return this.getId() === entity.getId();
  }

  owns(entity: Entity): boolean {
    // TODO: deep search
    let found = false;

    this.getChildren().forEach((item: Entity) => {
      if (item.isSameAs(entity)) {
        found = true;
      }
    });

    return found;
  }

  moveTo(newParent: Entity): void {
    const previousParentId = this.parentId;

    if (previousParentId) {
      const previousParent = GameController.getPlay().getEntity(
        previousParentId
      );

      previousParent.childrenId.forEach((item, index) => {
        if (item === this.id) {
          previousParent.childrenId.splice(index, 1);
        }
      });

      previousParent.save();
    }

    if (newParent) {
      newParent.childrenId.push(this.id);
      newParent.save();
    }

    this.parentId = newParent.id;
    this.save();
  }

  inheritsFrom(type: EntityType): boolean {
    return (
      this instanceof
      GameController.getPlay().getScenario().entityConstructors[type]
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
      const item = GameController.getPlay().getEntity(id);

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
      entity = GameController.getPlay().addEntityOfType(type);
      this.addToList(entity.getId(), list);
    }

    return entity;
  }

  protected addToList(key: EntityId, list: EntityId[]): void {
    list.push(key);
    this.save();
  }

  protected removeFromList(key: EntityId, list: EntityId[]): void {
    list.forEach((item: EntityId, index: number) => {
      if (item === key) {
        list.splice(index, 1);
      }
    });

    this.save();
  }
}
