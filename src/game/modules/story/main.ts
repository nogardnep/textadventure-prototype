import { ParagraphTag } from 'src/game/core/models/Paragraph';

export type DescriptorId = string;

export interface EntityDescriptor {
  id: DescriptorId;
  name: Name;
  data: EntityData[];
}

export interface EntityData {
  name: string;
  type: EntityDataType;
  value: any;
}

export enum EntityDataType {
  Number = 'number',
  String = 'string',
}

export interface Character extends EntityDescriptor {
  scenarioId: DescriptorId;
  objects: DescriptorId[];
}

export interface UsuableObject extends EntityDescriptor {
  scenarioId: DescriptorId;
}

export interface Scenario extends EntityDescriptor {
  chapters: Chapter[];
  objects: UsuableObject[];
  characters: Character[];
  firstChapterId: DescriptorId;
}

export interface Chapter extends EntityDescriptor {
  scenarioId: DescriptorId;
  scenes: Scene[];
  firstSceneId: DescriptorId;
}

export interface Scene extends EntityDescriptor {
  chapterId: DescriptorId;
  snippets: Snippet[];
  firstSnippetId: DescriptorId;
}

export interface Snippet extends EntityDescriptor {
  sceneId: DescriptorId;
  paragraphs: Paragraph[];
  name: TextWrapper;
  choices: Choice[];
}

export interface Paragraph {
  text: TextWrapper;
  tag: ParagraphTag;
  conditions: Condition[];
}

export type Name = TextWrapper;

export type TextWrapper = {
  [languageKey: string]: string;
};

export interface Choice {
  text: TextWrapper;
  conditions: Condition[];
  actions: Action[];
}

export interface Action {
  subject: DescriptorId;
  destination: DescriptorId;
  type: ActionType;
}

export enum ActionType {
  GoToScene = 'goToScene',
  GoToChapter = 'goToChapter',
  GoToSnippet = 'goToSnippet',
  Give = 'give',
  Take = 'take',
}

export interface Condition {
  entityType: EntityDescriptorType;
  subject: DescriptorId;
  destination: DescriptorId;
  type: ConditionType;
  contrary?: boolean;
}

export enum EntityDescriptorType {
  Scenario = 'scenario',
  Character = 'character',
  Object = 'object',
  Scene = 'scene',
  Snippet = 'snippet',
  Chapter = 'chapter',
}

export enum ConditionType {
  owns = 'owns',
}

export interface Play {}
