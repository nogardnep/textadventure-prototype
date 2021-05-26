import { Play } from 'src/game/core/models/Play';
import { UsuableObject } from 'src/game/modules/base/models/entities/material/thing/UsuableObject';

export class Container extends UsuableObject {
  constructor(play: Play) {
    super(play);

    this.setOpenable(true);
    this.setClosed(true);
  }
}
