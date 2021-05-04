import { Thing } from 'src/game/models/entities/material/Thing';
import { Character } from 'src/game/models/entities/material/Character';
import { Action } from '../Actions';
import { WearableObject } from 'src/game/models/entities/material/thing/object/WearableObject';

export const put: Action = {
  text: { fr: 'mettre' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (author.isOwning(target, false) && target.wearable && !target.worn) {
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
