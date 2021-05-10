import { ActionReport } from './../../../../../core/models/Action';
import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { Tag } from 'src/game/core/models/Narration';
import { Section } from 'src/game/core/models/Section';
import { TextWrapper } from 'src/game/core/models/Text';
import { DirectionKey } from '../../../dictionnaries/direction';
import { MaterialEntity } from '../MaterialEntity';
import { Character } from './Character';

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

  connectionUsed(entity: MaterialEntity, connection: Connection): ActionReport {
    const success = entity.moveTo(
      this.getPlay().getEntity(connection.destinationId) as MaterialEntity
    );

    return { success };
  }

  onVisitedBy(entity: MaterialEntity): void {
    // TODO: makes bug
    // this.getPlay().getNarration().addSection({
    //   paragraphs: this.getInteriorDescription(),
    //   tag: Tag.Description,
    // });
  }

  exitToPlace(type: EntityType): void {
    const entity = this.getPlay().getFirstEntityOfType(type);
    (this.getPlay().getPlayer() as Character).moveTo(entity as MaterialEntity);
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
