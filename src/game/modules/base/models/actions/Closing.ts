import { templateJitUrl } from '@angular/compiler';
import { Action } from 'src/game/core/models/Action';
import { Character } from '../entities/material/Character';
import { Thing } from '../entities/material/Thing';

export class Closing extends Action {
  getText() {
    return  'fermer' ;
  }

  check(author: Character, args: any[]) {
    let usable = false;
    const target = args[0];

    if (target instanceof Thing && target.isOpenable() && !target.isClosed()) {
      usable = true;
    }

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const target = args[0] as Thing;

    return target.closedBy(author);
  }
}
