import { Thing } from 'src/game/models/entities/material/Thing';
import { Character } from 'src/game/models/entities/material/Character';
import { Action } from '../Actions';

export const close: Action = {
  text: { fr: 'fermer' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (target instanceof Thing && target.openable && !target.closed) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as Thing;
    target.close();
  },
};
