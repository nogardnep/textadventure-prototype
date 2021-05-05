import { Character } from 'src/game/models/entities/material/Character';
import { UsuableObject } from 'src/game/models/entities/material/thing/UsuableObject';
import { Action } from '../Actions';

export const drop: Action = {
  text: { fr: 'poser' },
  check: (author: Character, args: any[]) => {
    let success = false;
    const target = args[0];

    if (
      target instanceof UsuableObject &&
      !target.fixed &&
      author.isOwning(target, false)
    ) {
      success = true;
    }

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as UsuableObject;
    target.drop();
  },
  duration: 0,
};
