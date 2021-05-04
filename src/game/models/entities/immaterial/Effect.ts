import { WithModifiers } from './../constraints/WithModifiers';
import { ImmaterialEntity } from '../ImmaterialEntity';

export class Effect extends ImmaterialEntity implements WithModifiers {
  getModifiers(): {
    [key: string]: { value: number; condition?: () => boolean };
  } {
    return {};
  }
}
