import { Character } from 'src/game/models/entities/Character';
import { Spell } from 'src/game/models/entities/Spell';
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
