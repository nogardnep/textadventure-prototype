import { EntityId } from 'src/game/models/Entity';
import { Thing } from './Thing';

export abstract class Door extends Thing {
  destination: EntityId;
}
