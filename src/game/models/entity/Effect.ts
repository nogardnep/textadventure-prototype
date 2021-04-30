import { WithModifiers } from './WithModifiers';
import { Entity } from '../Entity';

export class Effect extends Entity implements WithModifiers {
  getModifiers(): { [key: string]: { value: number; condition?: () => boolean; }; } {
    return {};
  }
}
