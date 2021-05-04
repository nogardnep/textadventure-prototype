import { UsuableObject } from 'src/game/models/entities/material/thing/UsuableObject';
import { Name } from 'src/game/models/Name';
import { Play } from 'src/game/models/Play';

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
