import { UsableObject } from 'src/game/models/entities/UsableObject';
import { Name } from '../../../../game/models/Name';
export class Box extends UsableObject {
  constructor() {
    super();

    this.openable = true;
    this.closed = true;
    this.transparent = true;
  }

  getName() {
    return { fr: new Name('Box') };
  }
}
