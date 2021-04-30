import { NameWrapper } from './Text';
import { Paragraph } from './Paragraph';
import { Action } from './Action';
import { Play } from './../models/Play';
import { GameController } from '../GameController';

export type EntityId = string;
export type EntityType = string;

export interface EntityPresentation {
  name?: string;
  interiorDescription?: string;
  exteriorDescription?: string;
}

export interface StoredEntity {
  id: EntityId;
  type: EntityType;
  // data: {};
  parentId: EntityId;
  childrenId: EntityId[];
  save(): void;
}

export class Entity implements StoredEntity {
  id: EntityId;
  childrenId: EntityId[];
  parentId: EntityId;
  type: EntityType;
  // data: {};
  // private presentation: EntityPresentation;

  constructor(data?: EntityPresentation) {
    this.id = Math.floor(Math.random() * 1000).toString();
    this.childrenId = [];
    this.type = this.constructor.name;
    this.parentId = null;
    // this.data = {};
    // this.presentation = data ? data : {};
  }

  getType(): string {
    return this.type;
  }

  getName(): NameWrapper {
    return null;
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
    return additionnal? additionnal: {};
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

  moveTo(newParent: Entity): void {
    const previousParentId = this.parentId;

    if (previousParentId) {
      const previousParent = GameController.getEntity(previousParentId);

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

  isInstanceOf(type: EntityType): boolean {
    return this instanceof GameController.scenario.entityConstructors[type];
  }

  save(): void {
    GameController.storeEntity(this);
  }
}
