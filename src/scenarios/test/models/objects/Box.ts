import { Play } from 'src/game/models/Play';
import { Thing } from 'src/game/models/entities/Thing';
import { Name } from '../../../../game/models/Name';

export class Box extends Thing {
  constructor(play: Play) {
    super(play);

    this.openable = true;
    this.closed = true;
    this.transparent = true;
  }

  getName() {
    return { fr: new Name('Box') };
  }
}
