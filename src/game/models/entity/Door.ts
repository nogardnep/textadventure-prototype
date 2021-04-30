import { Entity, EntityId } from '../Entity';

export abstract class Door extends Entity {
  destination: EntityId;
}
