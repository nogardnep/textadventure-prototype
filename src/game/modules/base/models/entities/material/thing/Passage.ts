import { Name } from 'src/game/core/models/Name';
import { Thing } from '../Thing';

export class Passage extends Thing {
  getName() {
    return new Name('passage');
  }
}
