import { Play } from 'src/game/models/Play';
import { Thing } from 'src/game/models/entities/material/Thing';
import { Name } from '../../../../game/models/Name';
import { HoldableObject } from 'src/game/models/entities/material/thing/object/HoldableObject';

export class Shield extends HoldableObject {
  constructor(play: Play) {
    super(play);
  }

  getName() {
    return { fr: new Name('shield') };
  }
}
