import { Play } from 'src/game/models/Play';
import { Entity, EntityType } from './Entity';

export type Scenarios = { [key: string]: Scenario };
export type ScenarioId = string;

export interface Scenario {
  id: ScenarioId;
  entityConstructors: { [key: string]: new (play: Play) => Entity };
  starting: {
    maxSpells: number;
    caracteristicsPoints: number;
    availableSpells: EntityType[];
    askForName: boolean;
  };
  init(play: Play): void;
  start(): void;
}
