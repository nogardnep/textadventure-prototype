import { Entity } from './Entity';

export interface BaseGlossary {
  outOfReach(entity: Entity): string;
  alreadyOwned(entity: Entity): string
  fixed(entity: Entity):string
  notTakable(entity: Entity): string
}
