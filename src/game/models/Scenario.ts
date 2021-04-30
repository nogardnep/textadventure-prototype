import { Entity } from './Entity';

export interface Scenario {
  entityConstructors: { [key: string]: new () => Entity };
  init(): { [key: string]: Entity };
}
