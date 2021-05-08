import { Action } from 'src/game/core/models/Action';
import { UsuableObject } from '../../models/entities/material/thing/UsuableObject';
import { Character } from '../entities/material/Character';

export class Taking extends Action {
  getText() {
    return { fr: 'prendre' };
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as UsuableObject;

    // TODO
    // if (test instanceof UsuableObject) {
    if (!target.fixed) {
      if (!author.isOwning(target, false)) {
        if (author.canReach(target)) {
          usable = true;
        } else {
          // failureMessage = this.getPlay().getGlossary().outOfReach(target);
        }
      } else {
        // failureMessage = this.getPlay().getGlossary().alreadyOwned(target);
      }
    } else {
      // failureMessage = this.getPlay().getGlossary().fixed(target);
    }
    // } else {
    //   failureMessage = this.getPlay().getGlossary().notTakable(target);
    // }

    return {
      usable,
      failureMessage,
    };
  }

  proceed(author: Character, args: any[]) {
    // TODO
    const target = args[0] as UsuableObject;
    // if (target instanceof UsuableObject) {
    target.giveTo(author);
    // }
  }
}
