import { Passage } from 'src/game/models/entities/material/thing/Passage';
import { Name } from 'src/game/models/Name';
import { Play } from 'src/game/models/Play';

export class Door extends Passage {
  constructor(play: Play) {
    super(play);

    this.openable = true;
    this.closed = true;
  }

  getName() {
    return { fr: new Name('porte') };
  }
}
