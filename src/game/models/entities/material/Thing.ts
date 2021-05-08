import { BaseActionKeys } from '../../../dictionnaries/Actions';
import { MaterialEntity } from '../MaterialEntity';

export  class Thing extends MaterialEntity {
  fixed = false;
  transparent = false;
  openable = false;
  closed = false;

  getDisplayedActionKeys() {
    return super.getDisplayedActionKeys().concat([BaseActionKeys.Opening, BaseActionKeys.Closing]);
  }

  close(): void {
    this.closed = true;
  }

  open(): void {
    this.closed = false;
  }
}
