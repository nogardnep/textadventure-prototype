import { Entity, EntityId, EntityType } from './Entity';
import { Character } from './entity/Character';

export interface Scenario {
  entityConstructors: { [key: string]: new () => Entity };
  starting: {
    maxSpells: number;
    caracteristicsPoints: number;
    availableSpells: EntityType[];
    askForName: boolean
  };
  getInitialPlayer(): Character
  initPlay(player: Character): { [key: string]: Entity };
}
