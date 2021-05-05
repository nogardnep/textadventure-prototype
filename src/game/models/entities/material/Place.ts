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

export class Place extends MaterialEntity {
  connections: Connection[] = [];

  exitToConnection(connection: Connection): void {
    this.getPlay()
      .getPlayer()
      .moveTo(
        this.getPlay().getEntity(connection.destinationId) as MaterialEntity
      );
  }

  exitToPlace(type: EntityType): void {
    const entity = this.getPlay().getFirstEntityOfType(type);
    this.getPlay()
      .getPlayer()
      .moveTo(entity as MaterialEntity);
  }

  addConnection(connection: Connection): void {
    this.connections.push(connection);
  }

  getConnections(): Connection[] {
    return this.connections;
  }

  getSection(): Section {
    return null;
  }
}
