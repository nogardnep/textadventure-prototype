import { Action } from 'src/game/core/models/Action';
import { Character } from '../entities/material/Character';
import { UsuableObject } from '../entities/material/thing/UsuableObject';

export class Dropping extends Action {
  getDuration() {
    return 0;
  }

  getText() {
    return  'poser';
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0] as UsuableObject;

    if (!target.isFixed() && author.isOwning(target, false)) {
      usable = true;
    }

    return {
      usable,
    };
  }
  proceed(author: Character, args: any[]) {
    const target = args[0] as UsuableObject;

    return target.droppedBy(author);
  }
}
