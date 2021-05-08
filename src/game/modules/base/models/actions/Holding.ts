import { Action } from 'src/game/core/models/Action';
import { Character } from '../entities/material/Character';
import { HoldableObject } from '../entities/material/thing/object/HoldableObject';

export class Holding extends Action {
  getText() {
    return { fr: 'prendre en main' };
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0];

    if (
      target instanceof HoldableObject &&
      author.isOwning(target, false) &&
      !target.held
    ) {
      usable = true;
    }

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const target = args[0];

    if (target instanceof HoldableObject) {
      target.hold();
    }
  }
}
