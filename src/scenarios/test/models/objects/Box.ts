import { UsuableObject } from 'src/game/modules/base/models/entities/material/thing/UsuableObject';
import { Name } from 'src/game/core/models/Name';
import { Play } from 'src/game/core/models/Play';

export class Box extends UsuableObject {
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
