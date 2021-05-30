import { Subject } from 'src/game/modules/base/models/Conversation';
import { Gender } from './../dictionnaries/Gender';
import { Action, ActionContructor } from './Action';
import { Audio } from './Audio';
import { Entity, EntityType } from './Entity';
import { ConjugationTime, Glossary, Person } from './Glossary';
import { Image } from './Image';
import { Play } from './Play';

export type ScenarioId = string;
export type EntityConstructor = new (play: Play) => Entity;

export abstract class Scenario {
  private id: ScenarioId;
  private entityConstructors: { [key: string]: EntityConstructor } = {};
  private actions: { [key: string]: ActionContructor } = {};
  private glossaries: { [languageKey: string]: Glossary } = {};
  private images: { [key: string]: Image } = {};
  private audios: { [key: string]: Audio } = {};
  private subjects: { [key: string]: Subject } = {};
  private startDate: Date;

  // TODO: move?
  private glossaryConfiguration: {
    conjugationTime: ConjugationTime;
    receiverGender: Gender;
    receiverPerson: Person;
  };

  constructor(
    id: ScenarioId,
    params: {
      glossaries?: { [languageKey: string]: Glossary };
      entityConstructors: { [key: string]: EntityConstructor };
      images?: { [key: string]: Image };
      audios?: { [key: string]: Audio };
      actionsConstructor?: { [key: string]: ActionContructor };
      subjects?: { [key: string]: Subject };
    }
  ) {
    this.id = id;

    if (params.entityConstructors) {
      this.setEntityConstructors(params.entityConstructors);
    }

    if (params.glossaries) {
      this.setGlossaries(params.glossaries);
    }

    if (params.actionsConstructor) {
      this.setActions(params.actionsConstructor);
    }

    if (params.audios) {
      this.setAudios(params.audios);
    }

    if (params.images) {
      this.setImages(params.images);
    }

    if (params.subjects) {
      this.setSubjects(params.subjects);
    }
  }

  init(play: Play): void {}

  start(play: Play): void {}

  update(play: Play): void {}

  getTitle(): string {
    return null;
  }

  setStartDate(date: Date): void {
    this.startDate = date;
  }

  getGlossaryConfiguration() {}

  getId(): string {
    return this.id;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getAudios(): { [key: string]: Audio } {
    return this.audios;
  }

  getImages(): { [key: string]: Image } {
    return this.images;
  }

  getEntityConstructors(): { [key: string]: EntityConstructor } {
    return this.entityConstructors;
  }

  getGlossaries(): { [key: string]: Glossary } {
    return this.glossaries;
  }

  getActionConstructors(): { [key: string]: ActionContructor } {
    return this.actions;
  }

  getSubjects(): { [key: string]: Subject } {
    return this.subjects;
  }

  setActions(actions: { [key: string]: ActionContructor }): void {
    this.actions = Object.assign({}, this.actions, actions);
  }

  setImages(images: { [key: string]: Image }): void {
    this.images = Object.assign({}, this.images, images);
  }

  setAudios(audios: { [key: string]: Audio }): void {
    this.audios = Object.assign({}, this.audios, audios);
  }

  setSubjects(subjects: { [key: string]: Subject }): void {
    this.subjects = Object.assign({}, this.subjects, subjects);
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
