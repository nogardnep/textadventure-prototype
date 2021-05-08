import { Action } from '../Action';
import { Character } from '../entities/material/Character';
import { UsuableObject } from '../entities/material/thing/UsuableObject';

export class Dropping extends Action {
  getDuraction() {
    return 0;
  }

  getText() {
    return { fr: 'poser' };
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0] as UsuableObject;

    if (!target.fixed && author.isOwning(target, false)) {
      usable = true;
    }

    return {
      usable,
    };
  }
  proceed(author: Character, args: any[]) {
    const target = args[0] as UsuableObject;
    target.drop();
  }
}
