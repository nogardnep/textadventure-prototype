import { Character } from 'src/game/models/entities/Character';
import { Thing } from 'src/game/models/entities/Thing';
import { Action } from '../Actions';

export const drop: Action = {
  text: { fr: 'lâcher' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (!target.fixed && author.isOwning(target, false)) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as Thing;
    target.drop();
  },
};
