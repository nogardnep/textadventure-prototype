import { Action, ActionsParams } from 'src/game/core/models/Action';
import { BasePlay } from '../BasePlay';

export class BaseAction extends Action {
  constructor(play: BasePlay, params: ActionsParams) {
    super(play, params);
  }

  getPlay(): BasePlay {
    return super.getPlay() as BasePlay;
  }
}
