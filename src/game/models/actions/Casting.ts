import { Action } from '../Action';
import { Spell } from '../entities/immaterial/Spell';
import { Character } from '../entities/material/Character';

export class Casting extends Action {
  getText() {
    return { fr: 'lancer' };
  }

  check(author: Character, args: any[]) {
    let usable = true;

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const target = args[0] as Spell;
    const location = author.getParent();
    location.getResponseToSpell(target);
  }
}
