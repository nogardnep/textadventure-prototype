import { Thing } from 'src/game/models/entities/Thing';
import { Character } from 'src/game/models/entities/Character';
import { Action } from '../Actions';

export const take: Action = {
  text: { fr: 'prendre' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (
      !target.fixed &&
      !author.isOwning(target, false) &&
      author.canReach(target)
    ) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as Thing;
    target.giveTo(author);
  },
};
