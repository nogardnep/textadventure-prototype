import { Effect } from 'src/game/models/entity/Effect';
import { GameController } from 'src/game/GameController';
import { EntityId, EntityType } from 'src/game/models/Entity';
import { UsableObject } from 'src/game/models/entity/UsableObject';
import { Entity } from '../Entity';
import { Caracteristics } from '../../enums/Caracteristic';
import { Spell } from './Spell';
import { WithModifiers } from './WithModifiers';

export abstract class Character extends Entity {
  spellsId: EntityId[] = [];
  effectsId: EntityId[] = [];
  caracteristics: Caracteristics = {
    life: {
      current: 10,
      max: 10,
    },
    resistance: {
      current: 10,
      max: 10,
    },
  };

  getCaracteristicValue(key: string): number {
    return this.caracteristics[key];
  }

  getWornObjects(): UsableObject[] {
    let found: UsableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (item instanceof UsableObject && this.isWorn(item.getId())) {
        found.push(item);
      }
    });

    return found;
  }

  getNotWornObjects(): UsableObject[] {
    let found: UsableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (item instanceof UsableObject && !this.isWorn(item.getId())) {
        found.push(item);
      }
    });

    return found;
  }

  isWorn(id: EntityId): boolean {
    const object = GameController.getPlay().getEntity(id);
    return object instanceof UsableObject && object.worn;
  }

  getWornObject(emplacementKey: string): UsableObject {
    let found: UsableObject = null;

    this.childrenId.forEach((id: EntityId) => {
      const entity = GameController.getPlay().getEntity(id);

      if (
        entity instanceof UsableObject &&
        entity.worn &&
        entity.getEmplacement() === emplacementKey
      ) {
        found = entity;
      }
    });

    return found;
  }

  getSpells(): Spell[] {
    const entities: Spell[] = [];

    this.spellsId.forEach((id: EntityId) => {
      const entity = GameController.getPlay().getEntity(id);
      entities.push(entity as Spell);
    });

    return entities;
  }

  getEffects(): Effect[] {
    const entities: Effect[] = [];

    this.effectsId.forEach((id: EntityId) => {
      const entity = GameController.getPlay().getEntity(id);
      entities.push(entity as Effect);
    });

    return entities;
  }

  getEffectiveCaracteristics(): { [key: string]: number } {
    const effectiveCaracteristics = {};

    for (let key in this.caracteristics) {
      effectiveCaracteristics[key] = this.getEffectiveCaracteristicValue(key);
    }

    return effectiveCaracteristics;
  }

  getEffectiveCaracteristicValue(key: string): number {
    let value = this.caracteristics[key];

    value += this.getCaracteristicModifiers(key);

    return value;
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
      const entity = (GameController.getPlay().getEntity(
        item
      ) as unknown) as WithModifiers;

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

  giveEffect(id: EntityId): void {
    this.addTo(id, this.effectsId);
  }

  giveEffectOfType(type: EntityType, doNotCreateNew = false): void {
    this.giveEntityOfType(type, this.effectsId, doNotCreateNew);
  }

  giveObjectOfType(type: EntityType, doNotCreateNew = false): void {
    this.giveEntityOfType(type, this.childrenId, doNotCreateNew);
  }

  giveSpellOfType(type: EntityType, doNotCreateNew = false): void {
    this.giveEntityOfType(type, this.spellsId, doNotCreateNew);
  }

  getEffectsOfType(type: EntityType): Entity[] {
    return this.getEntitiesOfType(type, this.effectsId);
  }

  getSpellsOfType(type: EntityType): Entity[] {
    return this.getEntitiesOfType(type, this.spellsId);
  }

  getObjectsOfType(type: EntityType): Entity[] {
    return this.getEntitiesOfType(type, this.childrenId);
  }

  takeOffEffect(key: EntityId): void {
    this.removeFrom(key, this.effectsId);
  }

  giveSpell(id: EntityId): void {
    this.addTo(id, this.spellsId);
  }

  takeOffSpell(id: EntityId): void {
    this.removeFrom(id, this.spellsId);
  }

  getSpellOfType(type: string): Spell {
    let spell: Spell = null;

    this.spellsId.forEach((id: EntityId) => {
      const item = GameController.getPlay().getEntity(id);

      if (item.inheritsFrom(type)) {
        spell = item as Spell;
      }
    });

    return spell;
  }

  private giveEntityOfType(
    type: EntityType,
    list: EntityId[],
    doNotCreateNew = false
  ): void {
    if (!doNotCreateNew || this.getEntitiesOfType(type, list).length === 0) {
      const newEntity = GameController.getPlay().addEntityOfType(type);
      this.addTo(newEntity.getId(), list);
    }
  }

  // TODO: move
  private getEntitiesOfType(type: EntityType, list: EntityId[]): Entity[] {
    const found: Entity[] = [];

    list.forEach((id: EntityId) => {
      const item = GameController.getPlay().getEntity(id);

      if (item.inheritsFrom(type)) {
        found.push(item);
      }
    });

    return found;
  }

  // TODO: move
  private addTo(key: EntityId, list: EntityId[]): void {
    list.push(key);
    this.save();
  }

  // TODO: move
  private removeFrom(key: EntityId, list: EntityId[]): void {
    list.forEach((item: EntityId, index: number) => {
      if (item === key) {
        list.splice(index, 1);
      }
    });

    this.save();
  }
}
