import { Entity } from 'src/game/core/models/Entity';
import { Image } from './Image';

export enum ParagraphTag {
  Warning = 'warning',
  Information = 'information',
  Description = 'description',
  Event = 'event',
  Speech = 'speech',
  ActionSuccess = 'actionSuccess',
  ActionFailure = 'actionFailure',
}

export enum ParagraphItemTag {
  Speacher = 'speacher',
}

export type ParagraphItem = {
  text: string;
  entity?: Entity;
  tag?: ParagraphItemTag;
};

export type Paragraph = {
  image?: Image;
  text?: string;
  items?: ParagraphItem[];
  tag: ParagraphTag;
  check?: () => boolean;
};
