import { DirectionKey } from 'src/game/dictionnaries/Direction';
import { EntityType } from 'src/game/models/Entity';
import { TextWrapper } from 'src/game/models/Text';
import { EntityId } from '../../Entity';
import { Section } from '../../Section';
import { MaterialEntity } from '../MaterialEntity';

export type Connection = {
  destinationId: EntityId;
  text: TextWrapper;
  passageId?: EntityId;
  directionKey?: DirectionKey;
  check?: () => boolean;
  distance?: number;
};

export const DEFAULT_DISTANCE = 1;
export const DEFAULT_SPEED = 1; // TODO: move

export  class Place extends MaterialEntity {
  connections: Connection[] = [];

  exit(exit: Connection): void {
    this.getPlay()
      .getPlayer()
      .moveTo(this.getPlay().getEntity(exit.destinationId));
  }

  addConnection(connection: Connection): void {}

  getConnections(): Connection[] {
    return [];
  }

  getSection(): Section {
    return null;
  }

  exitTo(type: EntityType): void {
    const entity = this.getPlay().getFirstEntityOfType(type);
    this.getPlay().getPlayer().moveTo(entity);
  }
}
