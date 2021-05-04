import { ActionKey, ActionKeys } from '../../../dictionnaries/Actions';
import { MaterialEntity } from '../MaterialEntity';

export  class Thing extends MaterialEntity {
  fixed = false;
  transparent = false;
  openable = false;
  closed = false;

  getDisplayedActions(next?: ActionKey[], previous?: ActionKey[]) {
    return super.getDisplayedActions([ActionKeys.Open, ActionKeys.Close], next);
  }

  close(): void {
    this.closed = true;
  }

  open(): void {
    this.closed = false;
  }
}
