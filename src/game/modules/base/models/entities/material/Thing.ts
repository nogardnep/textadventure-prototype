import { Character } from 'src/game/modules/base/models/entities/material/Character';
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

  closedBy(target: Character): boolean {
    this.closed = true;
    this.save()

    return true;
  }

  openedBy(target: Character): boolean {
    this.closed = false;
    this.save()

    return true
  }
}
