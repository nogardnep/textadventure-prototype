import { Action } from 'src/game/dictionnaries/Actions';
import { Character } from 'src/game/models/entities/Character';

export const look: Action = {
  text: { fr: 'regarder' },
  check: (author: Character, args: any[]) => {
    let success = true;
    const target = args[0];

    return {
      success,
    };
  },
  proceed: (author: Character, args: any[]) => {
    console.log('look')
  },
};
