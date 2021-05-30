import { BasePlay } from 'src/game/modules/base/BasePlay';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { UsuableObject } from '../../models/entities/material/thing/UsuableObject';
import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';

export class Taking extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'prendre';
      },
      patterns: [],
    });
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as UsuableObject;

    // TODO
    // if (test instanceof UsuableObject) {
    if (!target.isFixed()) {
      if (!author.owns(target, false)) {
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
