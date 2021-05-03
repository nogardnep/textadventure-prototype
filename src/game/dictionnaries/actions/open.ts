import { Thing } from 'src/game/models/entities/Thing';
import { Character } from 'src/game/models/entities/Character';
import { Action } from '../Actions';

export const open: Action = {
  text: { fr: 'ouvrir' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (target.openable && target.closed) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as Thing;
    target.open();
  },
};
