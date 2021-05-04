import { ActionKey, ActionKeys } from 'src/game/dictionnaries/Actions';
import { Entity } from 'src/game/models/Entity';
import { Thing } from '../Thing';

export class UsuableObject extends Thing {
  getDisplayedActions(next?: ActionKey[], previous?: ActionKey[]) {
    return super.getDisplayedActions([ActionKeys.Take, ActionKeys.Drop], next);
  }

  giveTo(entity: Entity): boolean {
    this.moveTo(entity);

    return true;
  }

  drop(): boolean {
    this.moveTo(
      this.getPlay().getEntity(this.getPlay().getPlayer().getParentId())
    );

    return true;
  }
}
