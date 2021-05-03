import { Play } from 'src/game/models/Play';
import { Thing } from 'src/game/models/entities/Thing';
import { Name } from '../../../../game/models/Name';

export class Sword extends Thing {
  constructor(play: Play) {
    super(play);

    this.holdable = true;
  }

  getName() {
    return { fr: new Name('sword') };
  }
}
