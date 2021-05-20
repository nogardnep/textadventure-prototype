import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Caracteristic } from '../Caracteristic';
import { ActionReport } from 'src/game/core/models/Action';
import { BaseGlossaryKey } from './../BaseGlossary';
import { BaseEntity } from './BaseEntity';
import { WithModifiers } from './constraints/WithModifiers';
import { Effect } from './immaterial/Effect';
import { Spell } from './immaterial/Spell';

export class MaterialEntity extends BaseEntity {
  invisible = false;
  childrenId: EntityId[] = [];
  parentId: EntityId = null;
  caracteristics: { [key: string]: Caracteristic } = {};
  effectsId: EntityId[] = [];
  factionId: EntityId = null;

  isOwning(entity: Entity, deepSearch: boolean): boolean {
    let found = false;

    this.getChildren().forEach((item: MaterialEntity) => {
      if (item.equals(entity)) {
        found = true;
      } else if (!found && deepSearch) {
        found = item.isOwning(entity, deepSearch);
      }
    });

    return found;
  }

  onVisitedBy(entity: MaterialEntity): void {
    this.getPlay().updateDisplay();
    // To be override in other classes
  }

  getEffects(): Effect[] {
    const entities: Effect[] = [];

    this.effectsId.forEach((id: EntityId) => {
      const entity = this.getPlay().getEntity(id);
      entities.push(entity as Effect);
    });

    return entities;
  }

  giveEffectOfType(type: EntityType, doNotCreateNew: boolean): Effect {
    return this.giveEntityOfTypeInList(
      type,
      this.effectsId,
      doNotCreateNew
    ) as Effect;
  }

  giveChildOfType(type: EntityType, doNotCreateNew: boolean): MaterialEntity {
    const entity = this.giveEntityOfTypeInList(
      type,
      this.childrenId,
      doNotCreateNew
    ) as MaterialEntity;

    if (entity) {
      entity.parentId = this.getId();
      entity.save();
    }

    return entity;
  }

  getChildrenOfType(type: EntityType, list: EntityId[]): MaterialEntity[] {
    const found: MaterialEntity[] = [];

    list.forEach((id: EntityId) => {
      const item = this.getPlay().getEntity(id) as MaterialEntity;

      if (item.inheritsFrom(type)) {
        found.push(item);
      }
    });

    return found;
  }

  moveTo(target: MaterialEntity): boolean {
    const previousParent = this.getParent();

    if (previousParent) {
      previousParent.getChildren().forEach((item, index) => {
        if (item.equals(this)) {
          previousParent.childrenId.splice(index, 1);
        }
      });

      previousParent.save();
    }

    if (target) {
      target.childrenId.push(this.id);
      target.save();
    }

    this.parentId = target.id;
    this.save();

    target.onVisitedBy(this);

    return true;
  }

  affectedBySpell(author: Character, spell: Spell): ActionReport {
    return {
      success: false,
      message: this.getPlay().getPhrase(BaseGlossaryKey.UnusefulSpell, [
        author,
        spell,
        this,
      ]),
    };
  }

  getParent(): MaterialEntity {
    let found: MaterialEntity = null;

    if (this.parentId) {
      found = this.getPlay().getEntity(this.parentId) as MaterialEntity;
    }

    return found;
  }

  getChildren(): MaterialEntity[] {
    const children: MaterialEntity[] = [];

    this.childrenId.forEach((id: EntityId) => {
      children.push(this.getPlay().getEntity(id) as MaterialEntity);
    });

    return children;
  }

  getEffectiveCaracteristics(): { [key: string]: number } {
    const effectiveCaracteristics = {};

    for (let key in this.caracteristics) {
      effectiveCaracteristics[key] = this.getEffectiveCaracteristicValue(key);
    }

    return effectiveCaracteristics;
  }

  getCaracteristicModifiers(key: string) {
    return (
      this.getModifier(key, this.childrenId) +
      this.getModifier(key, this.effectsId)
    );
  }

  private getModifier(id: EntityId, from: EntityId[]): number {
    let value = 0;

    from.forEach((item: EntityId) => {
      const entity = this.getPlay().getEntity(item) as unknown as WithModifiers;

      if (entity.getModifiers) {
        const modifier = entity.getModifiers()[id];
        if (modifier) {
          if (!modifier.condition || modifier.condition()) {
            value += modifier.value;
          }
        }
      }
    });

    return value;
  }

  getEffectiveCaracteristicValue(key: string): number {
    let value = this.caracteristics[key].current;

    value += this.getCaracteristicModifiers(key);

    return value;
  }

  getCaracteristicValue(key: string): number {
    return this.caracteristics[key].current;
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
