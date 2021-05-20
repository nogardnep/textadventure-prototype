import { Entity } from 'src/game/core/models/Entity';
import { Image } from './Image';

export enum MessageTag {
  Warning = 'warning',
  Event = 'event',
  Speech = 'speech',
  ActionSuccess = 'actionSuccess',
  ActionFailure = 'actionFailure',
}

export type Paragraph = {
  image?: Image;
  text?: string;
  items?: { text: string; entity?: Entity }[];
  tag?: MessageTag;
  check?: () => boolean;
};
