import { entityConstructors } from './../../TestScenario';
import { Character } from 'src/game/models/entity/Character';

export class Tom extends Character {
  name = 'Tom';

  init() {
    const test = this.giveChildOfType(entityConstructors.Helmet.name, true);
  }
}
