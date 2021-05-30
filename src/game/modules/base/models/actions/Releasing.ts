import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';
import { HoldableObject } from '../entities/material/thing/object/HoldableObject';
import { BasePlay } from './../../BasePlay';

export class Releasing extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'ranger';
      },
      patterns: [],
    });
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0];

    if (
      //target instanceof HoldableObject &&
      author.owns(target, false) &&
      target.held
    ) {
      usable = true;
    }

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const target = args[0] as HoldableObject;

    return target.releasedBy(author);
  }
}
