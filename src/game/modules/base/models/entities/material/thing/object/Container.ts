import { BasePlay } from 'src/game/modules/base/BasePlay';
import { UsuableObject } from 'src/game/modules/base/models/entities/material/thing/UsuableObject';

export class Container extends UsuableObject {
  constructor(play: BasePlay) {
    super(play);

    this.setOpenable(true);
    this.setClosed(true);
  }
}
