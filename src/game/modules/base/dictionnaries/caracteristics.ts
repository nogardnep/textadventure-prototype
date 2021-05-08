import { Name } from 'src/game/core/models/Name';
import { NameWrapper } from 'src/game/core/models/Text';

export enum CaracteristicKey {
  Life = 'life',
  Resistance = 'resistance',
}

export const CARACTERISTIC_NAMES: {
  [key in CaracteristicKey]: NameWrapper;
} = {
  life: { fr: new Name('life') },
  resistance: { fr: new Name('resistance') },
};
