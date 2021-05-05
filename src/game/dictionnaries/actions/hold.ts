import { Character } from 'src/game/models/entities/material/Character';
import { HoldableObject } from 'src/game/models/entities/material/thing/object/HoldableObject';
import { Action } from '../Actions';

export const hold: Action = {
  text: { fr: 'prendre en main' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (
      target instanceof HoldableObject &&
      author.isOwning(target, false) &&
      !target.held
    ) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0];

    if (target instanceof HoldableObject) {
      target.hold();
    }
  },
};
