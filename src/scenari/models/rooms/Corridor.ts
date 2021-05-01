import { Name } from '../../../game/models/Name';
import { entityConstructors } from '../../TestScenario';
import { GameController } from '../../../game/GameController';
import { Room } from '../../../game/models/entity/Room';

export class Corridor extends Room {
  toogle = false;

  getName() {
    return { fr: new Name('Corridor ' + this.toogle) };
  }

  getActions() {
    return super.getActions([
      {
        text: { fr: 'go to chamber' },
        proceed: () => {
          this.exitTo(entityConstructors.Chamber.name);
        },
      },
    ]);
  }
}
