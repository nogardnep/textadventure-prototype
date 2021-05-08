import { Thing } from './Thing';
import { EntityId, EntityType, Entity } from 'src/game/core/models/Entity';
import { Gender } from 'src/game/core/dictionnaries/Gender';
import { Play } from 'src/game/core/models/Play';
import { Spell } from '../immaterial/Spell';
import { MaterialEntity } from '../MaterialEntity';
import { HoldableObject } from './thing/object/HoldableObject';
import { WearableObject } from './thing/object/WearableObject';
import { UsuableObject } from './thing/UsuableObject';

export class Character extends MaterialEntity {
  dead = false;
  hands = 2;
  spellsId: EntityId[] = [];

  constructor(play: Play) {
    super(play);

    this.caracteristics = {
      life: {
        current: 10,
        max: 10,
        min: 0,
      },
      resistance: {
        current: 10,
        max: 10,
        min: 0,
      },
    };
  }

  getGender(): Gender {
    return Gender.Male;
  }

  getHeldObjects(): HoldableObject[] {
    let found: HoldableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (this.isHolding(item)) {
        found.push(item as HoldableObject);
      }
    });

    return found;
  }

  getWornObjects(): WearableObject[] {
    let found: WearableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (this.isWearing(item)) {
        found.push(item as WearableObject);
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
    return (entity as HoldableObject).held;
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

  giveEffect(entity: Entity): void {
    this.addToList(entity, this.effectsId);
  }

  giveSpell(entity: Entity): void {
    this.addToList(entity, this.spellsId);
  }

  giveChildOfType(type: EntityType, doNotCreateNew: boolean): MaterialEntity {
    const entity = this.giveEntityOfTypeInList(
      type,
      this.childrenId,
      doNotCreateNew
    ) as MaterialEntity;

    if (entity) {
      entity.setParent(this);
    }

    return entity;
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

  takeOffEffect(entity: Spell): void {
    this.removeFromList(entity, this.effectsId);
  }

  takeOffSpell(entity: Spell): void {
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

  canSee(entity: MaterialEntity): boolean {
    let response = false;

    if (!entity.invisible) {
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

  private checkVisible(entity: MaterialEntity): boolean {
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

  canReach(entity: MaterialEntity): boolean {
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

  private checkReachable(entity: MaterialEntity): boolean {
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
