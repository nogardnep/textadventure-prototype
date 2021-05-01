import { UsableObject } from 'src/game/models/entity/UsableObject';
import { Name } from '../../../game/models/Name';
export class Box extends UsableObject {
  constructor() {
    super();

    this.openable = true;
    this.closed = true;
  }

  getName() {
    return { fr: new Name('Box') };
  }
}
