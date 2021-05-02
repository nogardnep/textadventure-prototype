import { Name } from '../models/Name';
import { NameWrapper } from '../models/Text';

export enum CaracteristicKey {
  life,
  resistance,
}

export type Caracteristics = {
  [key in keyof typeof CaracteristicKey]: {
    current: number;
    max: number;
  };
};

export const CARACTERISTIC_KEYS: {
  [key in keyof typeof CaracteristicKey]: string;
} = {
  life: CaracteristicKey[CaracteristicKey.life],
  resistance: CaracteristicKey[CaracteristicKey.resistance],
};

export const CARACTERISTIC_NAMES: {
  [key in keyof typeof CaracteristicKey]: NameWrapper;
} = {
  life: { fr: new Name('life') },
  resistance: { fr: new Name('resistance') },
};
