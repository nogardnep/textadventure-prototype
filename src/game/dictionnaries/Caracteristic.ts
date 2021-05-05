import { Name } from '../models/Name';
import { NameWrapper } from '../models/Text';

export enum CaracteristicKey {
  Life = 'life',
  Resistance = 'resistance',
}

export type Caracteristic = {
  current: number;
  max: number;
  min: number;
};

export const CARACTERISTIC_NAMES: {
  [key in CaracteristicKey]: NameWrapper;
} = {
  life: { fr: new Name('life') },
  resistance: { fr: new Name('resistance') },
};
