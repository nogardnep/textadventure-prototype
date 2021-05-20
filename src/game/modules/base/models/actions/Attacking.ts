import { Action } from 'src/game/core/models/Action';
import { Character } from '../entities/material/Character';

export class Attacking extends Action {
  getText() {
    return  'attaquer' ;
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as Character;

    // TODO
    if (!target.dead) {
      if (author.canReach(target)) {
        usable = true;
      }
    }

    return {
      usable,
      failureMessage,
    };
  }

  proceed(author: Character, args: any[]) {
    // TODO
    let target = args[0] as Character;

    return target.attackedBy(author);
  }
}
