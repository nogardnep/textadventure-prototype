import { Entity } from 'src/game/core/models/Entity';

export interface BaseGlossary {
  outOfReach(entity: Entity): string;
  alreadyOwned(entity: Entity): string;
  fixed(entity: Entity): string;
  notTakable(entity: Entity): string;
}

export enum BaseGlossaryKey {
  OutOfReach = 'outOfReach',
  AlreadyOwned = 'alreadyOwned',
  Fixed = 'fixed',
  NotTakable = 'notTakable',
  GetPhrase = 'getPhrase',
  Take = 'take',
  AllHandsUsed = 'allHandsUsed',
  SomethingAlreadyWorn = 'somethingAlreadyWorn',
  UnusefulSpell = 'unusefulSpell',
}
