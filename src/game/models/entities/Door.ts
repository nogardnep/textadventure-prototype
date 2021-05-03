import { EntityId } from 'src/game/models/Entity';
import { Material } from './Material';

export abstract class Door extends Material {
  destination: EntityId;
}
