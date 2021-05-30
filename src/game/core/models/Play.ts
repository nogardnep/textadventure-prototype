import { Subject } from 'src/game/modules/base/models/Conversation';
import { TextManager } from '../TextManager';
import { Action, ActionPattern } from './Action';
import { Audio } from './Audio';
import { Choice } from './Choice';
import { Entity, EntityId, EntityType, StoredEntity } from './Entity';
import { ConjugationTime, Glossary, Person } from './Glossary';
import { Message } from './Message';
import { Name } from './Name';
import { Narration, StoredNarration } from './Narration';
import { Paragraph } from './Paragraph';
import { Scenario, ScenarioId } from './Scenario';

export interface StoredPlay {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: StoredNarration;
  time: number;
  scenarioId: ScenarioId;
  ended: boolean;
  lastUpdateTime: number;
}

export enum EndMode {
  Victory,
  Defeat,
}

export type PlayOutputs = {
  onAutoSave: () => void;
  onMessageSend: (message: Message) => void;
  onUpdate: () => void;
  onPlayMusic: (audio: Audio) => void;
  onPlaySoundEffect: (audio: Audio) => void;
  onEnd: (mode: EndMode, paragaphs: Paragraph[]) => void;
  onSearchingForActionArg: (author: Entity, pattern: ActionPattern) => Promise<Entity>
};

export class Play {
  private outputs: PlayOutputs;
  private entities: { [id: string]: Entity };
  private player: Entity;
  private narration: Narration;
  private time: number;
  private scenario: Scenario;
  private stored: StoredPlay;
  private ended: boolean;
  private lastUpdateTime: number;

  constructor(scenario: Scenario, outputs: PlayOutputs) {
    this.stored = {
      ended: null,
      narration: null,
      playerId: null,
      storedEntities: {},
      time: null,
      scenarioId: null,
      lastUpdateTime: null,
    };

    this.outputs = outputs;
    this.entities = {};
    this.player = null;
    this.narration = new Narration(this);
    this.scenario = scenario;
    this.time = 0;
    this.stored.scenarioId = this.scenario.getId();
    this.ended = false;
    this.lastUpdateTime = 0;

    Glossary.setReceiverPerson(Person.SecondPersonPlural);
    Glossary.setConjugationTime(ConjugationTime.Present);
  }

  init(): void {
    this.scenario.init(this);
    this.narration.save();
    this.storePlayer();
    this.storeTime();
    this.storeEnded();
    this.storeLastUpdateTime();
  }

  getOutputs(): PlayOutputs {
    return this.outputs;
  }

  start(): void {
    this.scenario.start(this);
  }

  update(): void {
    for (let key in this.entities) {
      const entity = this.entities[key];
      if (!entity.isDestroyed()) {
        this.entities[key].update();
      }
    }

    this.scenario.update(this);

    this.outputs.onUpdate();

    this.lastUpdateTime = this.time;
    this.storeLastUpdateTime();
  }

  getPassedTime(): number {
    return this.time - this.lastUpdateTime;
  }

  load(storedPlay: StoredPlay): void {
    this.stored = storedPlay;

    for (let id in storedPlay.storedEntities) {
      let entity: Entity = null;
      const storedEntity = storedPlay.storedEntities[id];
      const constructor =
        this.getScenario().getEntityConstructors()[storedEntity.type];

      if (constructor) {
        entity = new constructor(this);

        // TODO
        // Utils.assignWithModel(entity, stored);
        Object.assign(entity, storedEntity);
      } else {
        console.error(
          storedEntity.type + ' constructor not found (check in the list)'
        );
      }

      this.entities[id] = entity;
    }

    this.player = this.entities[storedPlay.playerId];
    this.time = storedPlay.time;
    this.ended = storedPlay.ended;

    if (storedPlay.narration) {
      this.narration.load(storedPlay.narration);
    }
  }

  end(mode: EndMode, paragaphs: Paragraph[]): void {
    this.outputs.onEnd(mode, paragaphs);
    this.ended = true;
    this.storeEnded();
  }

  isEnded(): boolean {
    return this.ended;
  }

  getStored(): StoredPlay {
    return this.stored;
  }

  getScenario(): Scenario {
    return this.scenario;
  }

  getPhrase(phraseKey: string, args: any[]): string {
    let found: string;

    found = this.searchForPhraseInOneGlossary(
      TextManager.currentLanguageKey,
      phraseKey,
      args
    );

    if (!found) {
      for (let languageKey in this.getScenario().getGlossaries()) {
        if (!found) {
          found = this.searchForPhraseInOneGlossary(
            languageKey,
            phraseKey,
            args
          );
        }
      }
    }

    return found;
  }

  getName(nameKey: string, args: any[]): Name {
    let found: Name;

    found = this.searchForNameInOneGlossary(
      TextManager.currentLanguageKey,
      nameKey,
      args
    );

    if (!found) {
      for (let languageKey in this.getScenario().getGlossaries()) {
        if (!found) {
          found = this.searchForNameInOneGlossary(languageKey, nameKey, args);
        }
      }
    }

    return found;
  }

  private searchForPhraseInOneGlossary(
    languageKey: string,
    phraseKey: string,
    args: any[]
  ): string {
    let found: string;
    let glossary = this.getScenario().getGlossaries()[languageKey];

    if (glossary) {
      found = glossary.getPhrase(phraseKey, args);
    }

    return found;
  }

  private searchForNameInOneGlossary(
    languageKey: string,
    nameKey: string,
    args: any[]
  ): Name {
    let found: Name;
    let glossary = this.getScenario().getGlossaries()[languageKey];

    if (glossary) {
      found = glossary.getName(nameKey, args);
    }

    return found;
  }

  addEntity(type: EntityType): Entity {
    const constructor = this.getScenario().getEntityConstructors()[type];
    const entity = new constructor(this);
    this.entities[entity.getId()] = entity;
    entity.init();
    entity.save();

    return entity;
  }

  getEntity(id: EntityId): Entity {
    if (!this.entities[id]) {
      console.error('Unfound entity (' + id + ')');
    }

    return this.entities[id];
  }

  getEntities(): { [id: string]: Entity } {
    return this.entities;
  }

  getFirstEntityOfType(type: EntityType, createIfNotExists = true): Entity {
    let entity: Entity = null;

    for (let id in this.entities) {
      if (this.entities[id].isOfType(type)) {
        entity = this.entities[id];
      }
    }

    if (!entity && createIfNotExists) {
      entity = this.addEntity(type);
    }

    return entity;
  }

  setPlayer(entity: Entity): void {
    this.player = entity;
    this.storePlayer();
  }

  getPlayer(): Entity {
    return this.player;
  }

  getTime(): number {
    return this.time;
  }

  getDate(): Date {
    const date = new Date(this.scenario.getStartDate().getTime());
    date.setSeconds(date.getSeconds() + this.time);
    return date;
  }

  setTime(time: number): void {
    this.time = time;
    this.storeTime();
  }

  getNarration(): Narration {
    return this.narration;
  }

  increaseTime(duration: number): void {
    this.time += duration;
    this.storeTime();
    this.update();
  }

  storeEntity(entity: Entity): void {
    this.stored.storedEntities[entity.getId()] = entity.getStored();
    this.save();
  }

  storeNarration(): void {
    this.stored.narration = this.narration.getStored();
    this.save();
  }

  storePlayer(): void {
    if (this.player) {
      this.stored.playerId = this.player.getId();
      this.save();
    }
  }

  storeTime(): void {
    this.stored.time = this.time;
    this.save();
  }

  storeEnded(): void {
    this.stored.ended = this.ended;
    this.save();
  }

  storeLastUpdateTime(): void {
    this.stored.lastUpdateTime = this.lastUpdateTime;
    this.save();
  }

  save(): void {
    this.outputs.onAutoSave();
  }

  sendMessage(message: Message) {
    this.outputs.onMessageSend(message);
  }

  getAction(key: string): Action {
    const actionConstructor = this.getScenario().getActionConstructors()[key];

    if (!actionConstructor) {
      console.error('Action "' + key + '" not found');
    }

    return new actionConstructor(this);
  }

  getSubject(key: string): Subject {
    const subject = this.getScenario().getSubjects()[key];

    if (!subject) {
      console.error('Subject "' + key + '" not found');
    }

    return subject;
  }

  useChoice(choice: Choice): void {
    choice.proceed();
  }

  playMusic(audio: Audio): void {
    this.outputs.onPlayMusic(audio);
  }

  playSoundEffect(audio: Audio): void {
    this.outputs.onPlaySoundEffect(audio);
  }
}
