import { Character } from 'src/game/models/entities/material/Character';
import { WearableObject } from 'src/game/models/entities/material/thing/object/WearableObject';
import { Action } from '../Actions';

export const put: Action = {
  text: { fr: 'mettre' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (
      target instanceof WearableObject &&
      author.isOwning(target, false) &&
      !target.worn
    ) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0];

    if (target instanceof WearableObject) {
      target.put();
    }
  },
};
