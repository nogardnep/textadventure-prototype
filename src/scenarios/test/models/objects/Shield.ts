import { Play } from 'src/game/models/Play';
import { UsableObject } from 'src/game/models/entities/UsableObject';
import { Name } from '../../../../game/models/Name';

export class Shield extends UsableObject {
  constructor(play: Play) {
    super(play);

    this.holdable = true;
  }

  getName() {
    return { fr: new Name('shield') };
  }
}
