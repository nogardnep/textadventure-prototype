import { Character } from 'src/game/models/entities/material/Character';
import { Spell } from 'src/game/models/entities/immaterial/Spell';
import { Action } from '../Actions';

export const cast: Action = {
  text: { fr: 'lancer' },
  check: (author: Character, args: any[]) => {
    let success = true;

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    const target = args[0] as Spell;
    const location = author.getParent();
    location.getResponseToSpell(target);
  },
};
