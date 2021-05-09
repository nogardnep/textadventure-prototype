import { GameController } from 'src/game/core/GameController';
import { stringify } from '@angular/compiler/src/util';
import { TextManager } from '../TextManager';
import { Action } from './Action';
import { Choice } from './Choice';
import { Entity, EntityId, EntityType, StoredEntity } from './Entity';
import { ConjugationTime, Glossary, Person } from './Glossary';
import { Narration, StoredNarration, Tag } from './Narration';
import { Paragraph } from './Paragraph';
import { Scenario, ScenarioId } from './Scenario';

export interface StoredPlay {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: StoredNarration;
  time: number;
  scenarioId: ScenarioId;
}

type PlayCallBacks = {
  onSave: () => void;
  onInform: (paragraphs: Paragraph[], actions?: Choice[]) => void;
  onStartConversation: (interlocutor: Entity) => void;
};

export class Play {
  private entities: { [id: string]: Entity };
  private player: Entity;
  private narration: Narration;
  private time: number;
  private scenario: Scenario;
  private stored: StoredPlay;
  private callbacks: PlayCallBacks;

  constructor(scenario: Scenario, callbacks: PlayCallBacks) {
    this.stored = {
      narration: null,
      playerId: null,
      storedEntities: {},
      time: null,
      scenarioId: null,
    };

    this.callbacks = callbacks;
    this.entities = {};
    this.player = null;
    this.narration = new Narration(this);
    this.scenario = scenario;
    this.time = 0;
    this.stored.scenarioId = this.scenario.id;

    Glossary.setReceiverPerson(Person.SecondPersonPlural);
    Glossary.setConjugationTime(ConjugationTime.Present);

    GameController.setPlay(this);
  }

  init(): void {
    this.scenario.init(this);
    this.narration.save();
    this.storePlayer();
    this.storeTime();
  }

  start(): void {
    this.scenario.update(this);
  }

  update(): void {
    for (let key in this.entities) {
      this.entities[key].update();
    }

    this.scenario.update(this);
  }

  load(storedPlay: StoredPlay): void {
    this.stored = storedPlay;

    for (let id in storedPlay.storedEntities) {
      let entity: Entity = null;
      const storedEntity = storedPlay.storedEntities[id];
      const constructor = this.getScenario().entityConstructors[
        storedEntity.type
      ];

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

    if (storedPlay.narration) {
      this.narration.load(storedPlay.narration);
    }
  }

  getStored(): StoredPlay {
    return this.stored;
  }

  getScenario(): Scenario {
    return this.scenario;
  }

  getPhrase(phraseKey: string, args: any[]): string {
    let foundPhrase = '(missing)';

    foundPhrase = this.searchForPhraseInOneGlossary(
      TextManager.currentLanguageKey,
      phraseKey,
      args
    );

    if (!foundPhrase) {
      for (let languageKey in this.getScenario().glossaries) {
        if (!foundPhrase) {
          foundPhrase = this.searchForPhraseInOneGlossary(
            languageKey,
            phraseKey,
            args
          );
        }
      }
    }

    return foundPhrase;
  }

  private searchForPhraseInOneGlossary(
    languageKey: string,
    phraseKey: string,
    args: any[]
  ): string {
    let foundPhrase: string;

    let glossary = this.getScenario().glossaries[languageKey];

    if (glossary) {
      foundPhrase = glossary.getPhrase(phraseKey, args);
    }

    return foundPhrase;
  }

  addEntity(type: EntityType): Entity {
    const constructor = this.getScenario().entityConstructors[type];
    const entity = new constructor(this);
    this.entities[entity.getId()] = entity;
    entity.init();
    entity.save();

    return entity;
  }

  getEntity(id: EntityId) {
    return this.entities[id];
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

  save(): void {
    this.callbacks.onSave();
  }

  inform(paragraphs: Paragraph[], choices?: Choice[]): void {
    this.callbacks.onInform(paragraphs, choices);
  }

  getAction(key: string): Action {
    const action = this.getScenario().actions[key];

    if (!action) {
      console.error('Action "' + key + '" not found');
    }

    return action;
  }

  useChoice(choice: Choice): void {
    // this.narration.addSection({
    //   paragraphs: [{ text: choice.text }],
    //   tag: Tag.Choice,
    // });
    console.log('dfqd');

    console.log(choice);

    choice.proceed();
  }

  startConversation(interlocutor: Entity): void {
    this.callbacks.onStartConversation(interlocutor);
  }
}
