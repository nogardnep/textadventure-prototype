import { Name } from './Name';
import { NameWrapper } from './Text';

export enum CaracteristicKey {
  life,
  resistance,
}

export type Caracteristics = {
  [key in keyof typeof CaracteristicKey]: number;
};

export const caracteristicKeys: {
  [key in keyof typeof CaracteristicKey]: string;
} = {
  life: CaracteristicKey[CaracteristicKey.life],
  resistance: CaracteristicKey[CaracteristicKey.resistance],
};

export const caracteristicNames: {
  [key in keyof typeof CaracteristicKey]: NameWrapper;
} = {
  life: { fr: new Name('life') },
  resistance: { fr: new Name('resistance') },
};
