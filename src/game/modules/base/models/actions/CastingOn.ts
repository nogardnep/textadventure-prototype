import { Action } from 'src/game/core/models/Action';
import { Spell } from '../entities/immaterial/Spell';
import { Character } from '../entities/material/Character';
import { MaterialEntity } from '../entities/MaterialEntity';

export class CastingOn extends Action {
  getText() {
    return  'lancer' ;
  }

  check(author: Character, args: any[]) {
    let usable = true;

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const spell = args[0] as Spell;
    const target = author.getParent();
    // const target = args[1] as MaterialEntity; // TODO

    return target.affectedBySpell(author, spell);
  }
}
