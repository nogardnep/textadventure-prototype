import { BasePlay } from '../../BasePlay';
import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';
import { UsuableObject } from '../entities/material/thing/UsuableObject';

export class Dropping extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'poser';
      },
      patterns: [],
    });
  }

  getDuration() {
    return 0;
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0] as UsuableObject;

    if (!target.isFixed() && author.owns(target, false)) {
      usable = true;
    }

    return {
      usable,
    };
  }
  proceed(author: Character, args: any[]) {
    const target = args[0] as UsuableObject;

    return target.droppedBy(author);
  }
}
