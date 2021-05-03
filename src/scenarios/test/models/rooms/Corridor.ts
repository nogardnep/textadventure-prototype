import { Entity } from 'src/game/models/Entity';
import { Name } from '../../../../game/models/Name';
import { entityConstructors } from '../../TestScenario';
import { GameController } from '../../../../game/GameController';
import { Place } from '../../../../game/models/entities/Place';

export class Corridor extends Place {
  toogle = false;

  getName() {
    return { fr: new Name('Corridor ' + this.toogle) };
  }

  getChoices() {
    return super.getChoices([
      {
        text: { fr: 'go to chamber' },
        proceed: () => {
          this.exitTo(entityConstructors.Chamber.name);
        },
      },
    ]);
  }
}
