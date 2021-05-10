import { Entity } from 'src/game/core/models/Entity';
import { Image } from './Image';
import { TextWrapper } from './Text';

export enum MessageTag {
  Warning = 'warning',
  Event = 'event',
  Speech = 'speech',
  ActionSuccess = 'actionSuccess',
  ActionFailure = 'actionFailure',
}

export type Paragraph = {
  image?: Image;
  text?: TextWrapper;
  items?: { text: TextWrapper; entity?: Entity }[];
  tag?: MessageTag;
  check?: () => boolean;
};
