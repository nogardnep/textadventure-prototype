import { Name } from 'src/game/core/models/Name';

export enum CaracteristicKey {
  Life = 'life',
  Resistance = 'resistance',
  Force = 'force',
  Dexterity = 'dexterity',
  Magic = 'magic',
}

export const CARACTERISTIC_NAMES: {
  [key in CaracteristicKey]: Name;
} = {
  life: new Name('vitalité', {
    properNoun: true,
  }),
  magic: new Name('magie', {
    properNoun: true,
  }),
  resistance: new Name('résistance', {
    properNoun: true,
  }),
  force: new Name('force', {
    properNoun: true,
  }),
  dexterity: new Name('dextérité', {
    properNoun: true,
  }),
};
