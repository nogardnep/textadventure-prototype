import { Play } from 'src/game/models/Play';
import { Action } from '../dictionnaries/Actions';
import { Direction } from '../dictionnaries/Direction';
import { Entity, EntityType } from './Entity';
import { TextWrapper } from './Text';

export type Scenarios = { [key: string]: Scenario };

export type ScenarioId = string;

export interface Scenario {
  id: ScenarioId;
  title: TextWrapper;
  entityConstructors: { [key: string]: new (play: Play) => Entity };
  actions?: { [key: string]: Action };
  directions?: { [key: string]: Direction };
  starting: {
    maxSpells: number;
    caracteristicsPoints: number;
    availableSpells: EntityType[];
    askForName: boolean;
  };
  init(play: Play): void;
  start(play: Play): void;
  update(play: Play): void;
}
