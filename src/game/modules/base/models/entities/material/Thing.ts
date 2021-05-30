import { ActionReport } from 'src/game/core/models/Action';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { BaseActionKeys } from '../../../dictionnaries/actions';
import { MaterialEntity } from '../MaterialEntity';

export class Thing extends MaterialEntity {
  private fixed = false;
  private transparent = false;
  private openable = false;
  private closed = false;

  getDisplayedActions() {
    return super
      .getDisplayedActions()
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

  setOpenable(openable: boolean): void {
    this.openable = openable;
    this.save();
  }

  setClosed(closed: boolean): void {
    this.closed = closed;
    this.save();
  }

  setTransparent(transparent: boolean): void {
    this.transparent = transparent;
    this.save();
  }

  setFixed(fixed: boolean): void {
    this.fixed = fixed;
    this.save();
  }

  isOpenable(): boolean {
    return this.openable;
  }

  isTransparent(): boolean {
    return this.transparent;
  }

  isClosed(): boolean {
    return this.closed;
  }

  isFixed(): boolean {
    return this.fixed;
  }
}
