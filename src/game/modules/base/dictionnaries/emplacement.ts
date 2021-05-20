import { Name } from 'src/game/core/models/Name';

export enum EmplacementKey {
  Head = 'head',
  Body = 'body',
  Foot = 'foot',
}

export const EMPLACEMENT_NAMES: {
  [key in EmplacementKey]: Name;
} = {
  head: new Name('tête', {feminin: true}),
  body: new Name('corps'),
  foot: new Name('pieds', {plural: true}),
};
