import { Name } from 'src/game/core/models/Name';
import { TestScenario } from '../../TestScenario';
import { Place } from 'src/game/modules/base/models/entities/material/Place';

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
          this.exitToPlace(TestScenario.entityConstructors.Chamber.name);
        },
      },
    ]);
  }
}
