import { BasePlay } from '../../BasePlay';
import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';
import { WearableObject } from '../entities/material/thing/object/WearableObject';

export class Pulling extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'retirer';
      },
      patterns: [],
    });
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0];

    if (
      // target instanceof WearableObject &&
      author.owns(target, false) &&
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
