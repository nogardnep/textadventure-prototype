import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Action } from 'src/game/core/models/Action';
import { Entity } from 'src/game/core/models/Entity';
import { UsuableObject } from '../../models/entities/material/thing/UsuableObject';
import { BaseGlossaryKey } from '../BaseGlossary';
import { Character } from '../entities/material/Character';

export class Taking extends Action {
  getText() {
    return 'prendre';
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
          // failureMessage = this.getPlay()
          //   .getGlossary()
          //   .getPhrase(BaseGlossaryKey.OutOfReach, [target]);
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
    const target = args[0] as UsuableObject;

    return target.takenBy(author as MaterialEntity);
  }
}
