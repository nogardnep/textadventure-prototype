import { Action } from 'src/game/core/models/Action';
import {
  Connection,
  DEFAULT_DISTANCE,
  DEFAULT_SPEED,
} from 'src/game/modules/base/models/entities/material/Place';
import { Character } from '../entities/material/Character';
import { Place } from '../entities/material/Place';
import { Passage } from '../entities/material/thing/Passage';

export class Cross extends Action {
  getText() {
    return 'traverser';
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as Passage;

    // TODO
    if (!target.closed && author.canReach(target)) {
      usable = true;
    }

    return {
      usable,
      failureMessage,
    };
  }

  proceed(author: Character, args: any[]) {
    return null;
    // const target = args[0] as Connection;

    // const startingPlace = author.getParent() as Place; // TODO: ugly

    // return startingPlace.connectionUsed(author, connection);
  }

  onEnded(withSuccess: boolean, author: Character, args: any[]) {
    // const connection = args[0] as Connection;

    // if (withSuccess) {
    //   this.getPlay().increaseTime(
    //     (connection.distance ? connection.distance : DEFAULT_DISTANCE) *
    //       DEFAULT_SPEED
    //   );
    // }
  }
}
