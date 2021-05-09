import { Entity } from 'src/game/core/models/Entity';
import { Image } from './Image';
import { TextWrapper } from './Text';

export type Paragraph = {
  image?: Image;
  text?: TextWrapper;
  items?: { text: TextWrapper; entity?: Entity; tag?: string }[];
  check?: () => boolean;
};
