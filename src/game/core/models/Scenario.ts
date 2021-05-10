import { Gender } from './../dictionnaries/Gender';
import { Action } from './Action';
import { Audio } from './Audio';
import { Entity } from './Entity';
import { ConjugationTime, Glossary, Person } from './Glossary';
import { Image } from './Image';
import { Play } from './Play';
import { TextWrapper } from './Text';


export type ScenarioId = string;

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
  images: { [key: string]: Image } = {};
  audios: { [key: string]: Audio } = {};

  init(play: Play): void {}

  start(play: Play): void {}

  update(play: Play): void {}
}
