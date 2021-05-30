import { Entity } from 'src/game/core/models/Entity';
import { BasePlay } from '../../BasePlay';
import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';
import { MaterialEntity } from '../entities/MaterialEntity';

export class LookingAt extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'regarder';
      },
      patterns: [],
    });
  }

  check(author: Entity, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as Entity;

    if (
      target instanceof MaterialEntity &&
      author instanceof Character &&
      author.canSee(target)
    ) {
      usable = true;
    }

    return {
      usable,
      failureMessage,
    };
  }

  proceed(author: Character, args: any[]) {
    let target = args[0] as MaterialEntity;

    return target.lookedBy(author);
  }
}
