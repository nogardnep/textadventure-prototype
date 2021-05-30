import { BasePlay } from '../../BasePlay';
import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';

export class Attacking extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'attaquer';
      },
      patterns: [],
    });
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as Character;

    // TODO
    if (!target.isDead()) {
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
