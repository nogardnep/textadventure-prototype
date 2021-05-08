import { Action } from 'src/game/core/models/Action';
import { Character } from '../entities/material/Character';
import { WearableObject } from '../entities/material/thing/object/WearableObject';

export class Putting extends Action {
  getText() {
    return { fr: 'mettre' };
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0];

    if (
      target instanceof WearableObject &&
      author.isOwning(target, false) &&
      !target.worn
    ) {
      usable = true;
    }

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const target = args[0];

    if (target instanceof WearableObject) {
      target.put();
    }
  }
}
