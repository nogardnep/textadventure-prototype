import { ActionReport } from 'src/game/core/models/Action';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { BaseActionKeys } from '../../../dictionnaries/actions';
import { MaterialEntity } from '../MaterialEntity';

export class Thing extends MaterialEntity {
  fixed = false;
  transparent = false;
  openable = false;
  closed = false;

  getDisplayedActionKeys() {
    return super
      .getDisplayedActionKeys()
      .concat([BaseActionKeys.Opening, BaseActionKeys.Closing]);
  }

  closedBy(target: Character): ActionReport {
    this.closed = true;
    this.save();

    return { success: true };
  }

  openedBy(target: Character): ActionReport {
    this.closed = false;
    this.save();

    return { success: true };
  }
}
