import { Name } from 'src/game/core/models/Name';

export enum BaseCaracteristicKey {
  Life = 'life',
  Resistance = 'resistance',
  Force = 'force',
  Dexterity = 'dexterity',
  Magic = 'magic',
}

export const BASE_CARACTERISTIC_NAMES: {
  [key in BaseCaracteristicKey]: Name;
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
