import { WithModifiers } from './constraints/WithModifiers';
import { Entity as Immaterial } from '../Entity';

export class Effect extends Immaterial implements WithModifiers {
  getModifiers(): { [key: string]: { value: number; condition?: () => boolean; }; } {
    return {};
  }
}
