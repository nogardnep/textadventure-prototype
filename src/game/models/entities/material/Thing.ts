import { ActionKey, ActionKeys } from '../../../dictionnaries/Actions';
import { MaterialEntity } from '../MaterialEntity';

export  class Thing extends MaterialEntity {
  fixed = false;
  transparent = false;
  openable = false;
  closed = false;

  getDisplayedActions() {
    return super.getDisplayedActions().concat([ActionKeys.Open, ActionKeys.Close]);
  }

  close(): void {
    this.closed = true;
  }

  open(): void {
    this.closed = false;
  }
}
