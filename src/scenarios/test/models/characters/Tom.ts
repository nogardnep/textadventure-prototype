import { Play } from 'src/game/core/models/Play';
import { TestScenario } from '../../TestScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

export class Tom extends Character {
  constructor(play: Play) {
    super(play);

    this.name = 'Tom';
    this.dead = true;
  }

  init() {
    const helmet = this.giveChildOfType(TestScenario.entityConstructors.Helmet.name, true);
    // TODO: this.put(helmet)
  }
}
