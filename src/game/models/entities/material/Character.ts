import { Thing } from 'src/game/models/entities/material/Thing';
import { EntityId, EntityType } from 'src/game/models/Entity';
import { Entity } from '../../Entity';
import { Caracteristics } from '../../../dictionnaries/Caracteristic';
import { Spell } from '../immaterial/Spell';
import { WithModifiers } from '../constraints/WithModifiers';
import { MaterialEntity } from '../MaterialEntity';
import { UsuableObject } from './thing/UsuableObject';
import { Effect } from '../immaterial/Effect';
import { HoldableObject } from './thing/object/HoldableObject';
import { WearableObject } from './thing/object/WearableObject';

export  class Character extends MaterialEntity {
  dead = false;
  hands = 2;
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

  getHeldObjects(): UsuableObject[] {
    let found: UsuableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (this.isHolding(item)) {
        found.push(item as UsuableObject);
      }
    });

    return found;
  }

  getWornObjects(): UsuableObject[] {
    let found: UsuableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (this.isWearing(item)) {
        found.push(item as UsuableObject);
      }
    });

    return found;
  }

  getInventoryObjects(): UsuableObject[] {
    let found: UsuableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (!this.isWearing(item) && !this.isHolding(item)) {
        found.push(item as UsuableObject);
      }
    });

    return found;
  }

  isHolding(entity: Entity): boolean {
    return (entity as HoldableObject).hold;
  }

  isWearing(entity: Entity): boolean {
    return (entity as WearableObject).worn;
  }

  getWornObject(emplacementKey: string): UsuableObject {
    let found: UsuableObject = null;

    this.childrenId.forEach((id: EntityId) => {
      const entity = this.getPlay().getEntity(id);

      if (
        entity instanceof WearableObject &&
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
      const entity = this.getPlay().getEntity(id);
      entities.push(entity as Spell);
    });

    return entities;
  }

  getEffects(): Effect[] {
    const entities: Effect[] = [];

    this.effectsId.forEach((id: EntityId) => {
      const entity = this.getPlay().getEntity(id);
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
      const entity = (this.getPlay().getEntity(
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

  giveEffect(entity: Entity): void {
    this.addToList(entity, this.effectsId);
  }

  giveSpell(entity: Entity): void {
    this.addToList(entity, this.spellsId);
  }

  giveChildOfType(type: EntityType, doNotCreateNew: boolean): Entity {
    const entity = this.giveEntityOfTypeInList(
      type,
      this.childrenId,
      doNotCreateNew
    );

    if (entity) {
      entity.setParentId(this.getId());
    }

    return entity;
  }

  giveEffectOfType(type: EntityType, doNotCreateNew: boolean): Effect {
    return this.giveEntityOfTypeInList(
      type,
      this.effectsId,
      doNotCreateNew
    ) as Effect;
  }

  giveSpellOfType(type: EntityType, doNotCreateNew: boolean): Spell {
    return this.giveEntityOfTypeInList(
      type,
      this.spellsId,
      doNotCreateNew
    ) as Spell;
  }

  getEffectsOfType(type: EntityType): Entity[] {
    return this.getChildrenOfType(type, this.effectsId);
  }

  getSpellsOfType(type: EntityType): Entity[] {
    return this.getChildrenOfType(type, this.spellsId);
  }

  takeOffEffect(entity: Entity): void {
    this.removeFromList(entity, this.effectsId);
  }

  takeOffSpell(entity: Entity): void {
    this.removeFromList(entity, this.spellsId);
  }

  getSpellOfType(type: string): Spell {
    let spell: Spell = null;

    this.spellsId.forEach((id: EntityId) => {
      const item = this.getPlay().getEntity(id);

      if (item.inheritsFrom(type)) {
        spell = item as Spell;
      }
    });

    return spell;
  }

  canSee(entity: Entity): boolean {
    let response = false;

    if (!(entity as MaterialEntity).invisible) {
      const parent = entity.getParent();

      if (parent) {
        if (parent.equals(this.getParent())) {
          response = true;
        } else {
          response = this.checkVisible(parent);
        }
      }
    }

    return response;
  }

  private checkVisible(entity: Entity): boolean {
    let response = false;

    if (!(entity as Thing).closed || (entity as Thing).transparent) {
      const parent = entity.getParent();

      if (parent && parent.equals(this.getParent())) {
        response = true;
      } else {
        response = this.checkVisible(parent);
      }
    }

    return response;
  }

  canReach(entity: Entity): boolean {
    let response = false;

    if (!(entity as MaterialEntity).invisible) {
        const parent = entity.getParent();

        if (parent) {
          if (parent.equals(this.getParent())) {
            response = true;
          } else {
            response = this.checkReachable(parent);
          }
        }
    }

    return response;
  }

  private checkReachable(entity: Entity): boolean {
    let response = false;

    if (
      !(entity as Thing).closed &&
      (entity.getParent().equals(this) ||
        !(entity instanceof Character) ||
        (entity as Character).dead)
    ) {
      const parent = entity.getParent();

      if (parent && parent.equals(this.getParent())) {
        response = true;
      } else {
        response = this.checkReachable(parent);
      }
    }

    return response;
  }
}