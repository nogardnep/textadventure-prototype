import { Gender } from './../dictionnaries/Gender';
import { Action } from './Action';
import { Entity } from './Entity';
import { ConjugationTime, Glossary, Person } from './Glossary';
import { Play } from './Play';
import { TextWrapper } from './Text';

export type Scenarios = { [key: string]: Scenario };

export type ScenarioId = string;

// export interface Scenario {
//   id: ScenarioId;
//   title: TextWrapper;
//   entityConstructors: { [key: string]: new (play: Play) => Entity };
//   actions?: { [key: string]: Action };
//   glossaries: { [languageKey: string]: Glossary };
//   glossaryConfiguration: {
//     conjugationTime: ConjugationTime;
//     receiverGender: Gender;
//     receiverPerson: Person;
//   };
//   init(play: Play): void;
//   start(play: Play): void;
//   update(play: Play): void;
// }

export abstract class Scenario {
  id: ScenarioId;
  title: TextWrapper;
  entityConstructors: { [key: string]: new (play: Play) => Entity } = {};
  actions: { [key: string]: Action } = {};
  glossaries: { [languageKey: string]: Glossary } = {};
  glossaryConfiguration: {
    conjugationTime: ConjugationTime;
    receiverGender: Gender;
    receiverPerson: Person;
  };

  init(play: Play): void {}

  start(play: Play): void {}

  update(play: Play): void {}
}
