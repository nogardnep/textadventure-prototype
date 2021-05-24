import { Place } from './../entities/material/Place';
import { Action } from 'src/game/core/models/Action';
import {
  Connection,
  DEFAULT_DISTANCE,
  DEFAULT_SPEED,
} from 'src/game/modules/base/models/entities/material/Place';
import { Character } from '../entities/material/Character';
import { Passage } from '../entities/material/thing/Passage';

export class GoingTo extends Action {
  getText() {
    return 'aller';
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let connection = args[0] as Connection;

    const passage = (
      connection.passageId
        ? author.getPlay().getEntity(connection.passageId)
        : null
    ) as Passage;

    if (!passage) {
      usable = true;
    } else if (passage.closed) {
      // TODO: failureMessage
    } else {
      usable = true;
    }

    return {
      usable,
      failureMessage,
    };
  }

  proceed(author: Character, args: any[]) {
    const connection = args[0] as Connection;

    const startingPlace = author.getParent() as Place; // TODO: ugly

    return startingPlace.connectionUsed(author, connection);
  }

  onEnded(withSuccess: boolean, author: Character, args: any[]) {
    const connection = args[0] as Connection;

    if (withSuccess) {
      this.getPlay().increaseTime(
        (connection.distance ? connection.distance : DEFAULT_DISTANCE) *
          DEFAULT_SPEED
      );
    }
  }
}
