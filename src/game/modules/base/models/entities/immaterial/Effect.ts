import { EntityId } from 'src/game/core/models/Entity';
import { ImmaterialEntity } from '../ImmaterialEntity';

export class Effect extends ImmaterialEntity {
  private ownerId: EntityId;

  getOwner() {
    return this.getPlay().getEntity(this.ownerId);
  }
}
