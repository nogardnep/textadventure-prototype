import { Passage } from 'src/game/modules/base/models/entities/material/thing/Passage';
import { Name } from 'src/game/core/models/Name';
import { Play } from 'src/game/core/models/Play';

export class Door extends Passage {
  constructor(play: Play) {
    super(play);

    this.openable = true;
    this.closed = true;
  }

  getName() {
    return  new Name('porte') ;
  }
}
