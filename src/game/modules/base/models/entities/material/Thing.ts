import { BaseActionKeys } from '../../../dictionnaries/actions';
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
    this.save()
  }

  open(): void {
    this.closed = false;
    this.save()
  }
}
