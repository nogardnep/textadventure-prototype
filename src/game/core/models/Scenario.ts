import { Gender } from './../dictionnaries/Gender';
import { Action } from './Action';
import { Audio } from './Audio';
import { Entity, EntityType } from './Entity';
import { ConjugationTime, Glossary, Person } from './Glossary';
import { Image } from './Image';
import { Play } from './Play';

export type ScenarioId = string;

export abstract class Scenario {
  id: ScenarioId;
  entityConstructors: { [key: string]: new (play: Play) => Entity } = {};
  actions: { [key: string]: Action } = {};
  glossaries: { [languageKey: string]: Glossary } = {};
  images: { [key: string]: Image } = {};
  audios: { [key: string]: Audio } = {};

  constructor(
    id: ScenarioId,
    params: {
      glossaries?: { [languageKey: string]: Glossary };
      entityConstructors: { [key: string]: new (play: Play) => Entity };
      images?: { [key: string]: Image };
      audios?: { [key: string]: Audio };
      actions?: { [key: string]: Action };
    }
  ) {
    this.id = id;

    if (params.entityConstructors) {
      this.setEntityConstructors(params.entityConstructors);
    }

    if (params.glossaries) {
      this.setGlossaries(params.glossaries);
    }

    if (params.actions) {
      this.setActions(params.actions);
    }

    if (params.audios) {
      this.setAudios(params.audios);
    }

    if (params.images) {
      this.setImages(params.images);
    }
  }

  // TODO: move?
  glossaryConfiguration: {
    conjugationTime: ConjugationTime;
    receiverGender: Gender;
    receiverPerson: Person;
  };

  init(play: Play): void {}

  start(play: Play): void {}

  update(play: Play): void {}

  getTitle(): string {
    return null;
  }

  setActions(actions: { [key: string]: Action }): void {
    this.actions = Object.assign({}, this.actions, actions);
  }

  setImages(images: { [key: string]: Image }): void {
    this.images = Object.assign({}, this.images, images);
  }

  setAudios(audios: { [key: string]: Audio }): void {
    this.audios = Object.assign({}, this.audios, audios);
  }

  setEntityConstructors(entityConstructors: {
    [key: string]: new (play: Play) => Entity;
  }): void {
    this.entityConstructors = Object.assign(
      {},
      this.entityConstructors,
      entityConstructors
    );
  }

  setGlossaries(glossaries: { [languageKey: string]: Glossary }): void {
    this.glossaries = Object.assign({}, this.glossaries, glossaries);
  }
}
