import { Action } from 'src/game/core/models/Action';
import { Character } from '../entities/material/Character';
import { WearableObject } from '../entities/material/thing/object/WearableObject';

export class Pulling extends Action {
  getText() {
    return { fr: 'retirer' };
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0];

    if (
      // target instanceof WearableObject &&
      author.isOwning(target, false) &&
      target.worn
    ) {
      usable = true;
    }

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const target = args[0] as WearableObject;

    return target.pulledBy(author);
  }
}
