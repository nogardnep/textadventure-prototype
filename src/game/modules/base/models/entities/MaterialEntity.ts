import { ActionReport } from 'src/game/core/models/Action';
import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { Utils } from 'src/game/core/Utils';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Caracteristic } from '../Caracteristic';
import { BaseGlossaryKey } from './../BaseGlossary';
import { BaseEntity } from './BaseEntity';
import { Effect } from './immaterial/Effect';
import { Faction } from './immaterial/Faction';
import { Spell } from './immaterial/Spell';

export type CaracteristTestReport = {
  success: boolean;
  critical: boolean;
};

const MIN_CARACTERISTIC_VALUE = 0;
const MAX_CARACTERISTIC_VALUE = 100;

export class MaterialEntity extends BaseEntity {
  private invisible = false;
  private childrenId: EntityId[] = [];
  private parentId: EntityId = null;
  private caracteristics: { [key: string]: Caracteristic } = {};
  private effectsId: EntityId[] = [];
  private factionsId: EntityId[] = [];

  setCaracteristic(key: string, caracteristic: Caracteristic): void {
    this.caracteristics[key] = caracteristic;
  }

  setInvisible(invisible: boolean): void {
    this.invisible = invisible;
  }

  isInvisible(): boolean {
    return this.invisible;
  }

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
    // this.getPlay().updateDisplay();
    // To be override
  }

  testCaracteristic(key: string, difficulty: number): CaracteristTestReport {
    let success = false;
    let critical = false;
    let value = this.getEffectiveCaracteristicValue(key) - difficulty;

    if (value <= MIN_CARACTERISTIC_VALUE) {
      value = MIN_CARACTERISTIC_VALUE + 1;
    } else if (value >= MAX_CARACTERISTIC_VALUE) {
      value = MAX_CARACTERISTIC_VALUE - 1;
    }

    const random = Utils.getRandom(
      MIN_CARACTERISTIC_VALUE,
      MAX_CARACTERISTIC_VALUE
    );

    if (random <= value) {
      success = true;
    }

    if (
      random === MIN_CARACTERISTIC_VALUE ||
      random === MAX_CARACTERISTIC_VALUE
    ) {
      critical = true;
    }

    this.getEffectiveCaracteristicValue(key);

    return {
      success,
      critical,
    };
  }

  getEffects(): Effect[] {
    const entities: Effect[] = [];

    this.effectsId.forEach((id: EntityId) => {
      const entity = this.getPlay().getEntity(id);
      entities.push(entity as Effect);
    });

    return entities;
  }

  getFactions(): Faction[] {
    const entities: Faction[] = [];

    this.factionsId.forEach((id: EntityId) => {
      const entity = this.getPlay().getEntity(id);
      entities.push(entity as Faction);
    });

    return entities;
  }

  ownsToFaction(faction: Faction): boolean {
    let found = false;

    this.getFactions().forEach((item) => {
      if (item.equals(faction)) {
        found = true;
      }
    });

    return found;
  }

  getEffectsOfType(type: EntityType): Effect[] {
    let found: Effect[] = [];

    this.getEffects().forEach((effect) => {
      if (effect.inheritsFrom(type)) {
        found.push(effect);
      }
    });

    return found;
  }

  removeEffectsOfTypes(types: EntityType[]): Effect[] {
    let found: Effect[] = [];

    this.effectsId.forEach((id, index) => {
      const effect = this.getPlay().getEntity(id) as Effect;

      types.forEach((type) => {
        if (effect.inheritsFrom(type)) {
          found.push(effect);
          effect.destroy();
          this.effectsId.splice(index, 1);
        }
      });
    });

    return found;
  }

  giveEffect(effect: Effect): Effect {
    this.effectsId.push(effect.getId());
    effect.getOwner().equals(this);
    effect.save();
    return effect;
  }

  giveEffectOfType(type: EntityType, doNotCreateNew = false): Effect {
    const effect = this.getPlay().addEntity(type) as Effect;
    this.giveEffect(effect);
    return effect;
  }

  giveChildOfType(type: EntityType, doNotCreateNew = false): MaterialEntity {
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

  giveChildrenOfType(types: EntityType[]): void {
    types.forEach((type) => {
      this.giveChildOfType(type);
    });
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
      target.childrenId.push(this.getId());
      target.save();
    }

    this.parentId = target.getId();
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
      const entity = this.getPlay().getEntity(item) as BaseEntity;

      if (entity.getModifiers) {
        const modifier = entity.getModifiers()[id];
        if (modifier) {
          if (!modifier.check || modifier.check()) {
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

  getCaracteristic(key: string): Caracteristic {
    return this.caracteristics[key];
  }

  getCaracteristics(): { [key: string]: Caracteristic } {
    return this.caracteristics;
  }

  // getCaracteristicValue(key: string): number {
  //   return this.caracteristics[key].current;
  // }

  protected giveEntityOfTypeInList(
    type: EntityType,
    list: EntityId[],
    doNotCreateNew: boolean
  ): Entity {
    let entity = null;

    // TODO: "getChildrenOfType" is an error?
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
