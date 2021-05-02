import { Play } from 'src/game/models/Play';
import { UsableObject } from 'src/game/models/entities/UsableObject';
import { Name } from '../../../../game/models/Name';

export class Box extends UsableObject {
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
