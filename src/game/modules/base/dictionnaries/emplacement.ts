import { Name } from 'src/game/core/models/Name';
import { NameWrapper } from 'src/game/core/models/Text';

export enum EmplacementKey {
  Head = 'head',
  Body = 'body',
  Foot = 'foot',
}

export const EMPLACEMENT_NAMES: {
  [key in EmplacementKey]: NameWrapper;
} = {
  head: { fr: new Name('head') },
  body: { fr: new Name('body') },
  foot: { fr: new Name('foot') },
};
