import { entityConstructors } from '../../TestScenario';
import { Character } from 'src/game/models/entities/Character';

export class Tom extends Character {
  constructor() {
    super();

    this.name = 'Tom';
    this.dead = true;
  }

  init() {
    const helmet = this.giveChildOfType(entityConstructors.Helmet.name, true);
    // TODO: this.put(helmet)
  }
}
