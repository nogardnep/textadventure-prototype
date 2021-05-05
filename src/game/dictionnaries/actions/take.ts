import { Thing } from 'src/game/models/entities/material/Thing';
import { Character } from 'src/game/models/entities/material/Character';
import { Action } from '../Actions';
import { UsuableObject } from 'src/game/models/entities/material/thing/UsuableObject';

export const take: Action = {
  text: { fr: 'prendre' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (
      target instanceof UsuableObject &&
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
    const target = args[0];

    if (target instanceof UsuableObject) {
      target.giveTo(author);
    }
  },
};
