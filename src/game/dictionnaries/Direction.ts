import { Name } from '../models/Name';
import { NameWrapper } from './../models/Text';

export type DiractionKey = string;

export type Direction = {
  key: DiractionKey;
  name: NameWrapper;
};

export const directions: { [key: string]: Direction } = {
  north: {
    key: 'north',
    name: { fr: new Name('nord') },
  },
  // TODO
};
