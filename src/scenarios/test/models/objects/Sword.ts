import { Play } from 'src/game/core/models/Play';
import { Name } from 'src/game/core/models/Name';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';

export class Sword extends HoldableObject {
  constructor(play: Play) {
    super(play);
  }

  getName() {
    return { fr: new Name('sword') };
  }
}
