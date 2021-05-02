import { Name } from "../models/Name";
import { NameWrapper } from "../models/Text";

export enum EmplacementKey {
  head,
  body,
  foot,
}

export const EMPLACEMENT_KEYS: {
  [key in keyof typeof EmplacementKey]: string;
} = {
  head: EmplacementKey[EmplacementKey.head],
  body: EmplacementKey[EmplacementKey.body],
  foot: EmplacementKey[EmplacementKey.foot],
};

export const EMPLACEMENT_NAMES: {
  [key in keyof typeof EmplacementKey]: NameWrapper;
} = {
  head: { fr: new Name('head') },
  body: { fr: new Name('body') },
  foot: { fr: new Name('foot') },
};
