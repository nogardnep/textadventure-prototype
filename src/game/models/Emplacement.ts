import { Name } from './Name';
import { NameWrapper } from './Text';

export enum EmplacementKey {
  head,
  body,
  foot,
}

export const emplacementKeys: {
  [key in keyof typeof EmplacementKey]: string;
} = {
  head: EmplacementKey[EmplacementKey.head],
  body: EmplacementKey[EmplacementKey.body],
  foot: EmplacementKey[EmplacementKey.foot],
};

export const emplacementNames: {
  [key in keyof typeof EmplacementKey]: NameWrapper;
} = {
  head: { fr: new Name('head') },
  body: { fr: new Name('body') },
  foot: { fr: new Name('foot') },
};
