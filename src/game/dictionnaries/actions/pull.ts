import { Thing } from 'src/game/models/entities/Thing';
import { Character } from 'src/game/models/entities/Character';
import { Action } from '../Actions';

export const pull: Action = {
  text: { fr: 'retirer' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (author.isOwning(target, false) && target.wearable && target.worn) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as Thing;
    target.pull();
  },
};
