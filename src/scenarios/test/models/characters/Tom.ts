import { Play } from 'src/game/models/Play';
import { entityConstructors } from '../../TestScenario';
import { Character } from 'src/game/models/entities/material/Character';

export class Tom extends Character {
  constructor(play: Play) {
    super(play);

    this.name = 'Tom';
    this.dead = true;
  }

  init() {
    const helmet = this.giveChildOfType(entityConstructors.Helmet.name, true);
    // TODO: this.put(helmet)
  }
}
