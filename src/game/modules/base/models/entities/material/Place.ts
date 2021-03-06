import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { Region } from 'src/game/core/models/Section';
import { DirectionKey } from '../../../dictionnaries/direction';
import { MaterialEntity } from '../MaterialEntity';
import { ActionReport } from 'src/game/core/models/Action';
import { Character } from './Character';
import { Passage } from './thing/Passage';
import { Play } from 'src/game/core/models/Play';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { Name } from 'src/game/core/models/Name';

export type Connection = {
  destinationId: EntityId;
  text?: string;
  passageId?: EntityId;
  directionKey?: DirectionKey;
  check?: () => boolean;
  distance?: number;
};

export const DEFAULT_DISTANCE = 1;
export const DEFAULT_SPEED = 1; // TODO: move

export class Place extends MaterialEntity {
  private connections: Connection[] = [];

  connectionUsed(entity: MaterialEntity, connection: Connection): ActionReport {
    const success = entity.moveTo(
      this.getPlay().getEntity(connection.destinationId) as MaterialEntity
    );

    return { success };
  }

  connectionPassageIs(
    connection: Connection,
    passageType: EntityType
  ): boolean {
    return (
      connection.passageId &&
      connection.passageId ===
        this.getPlay().getFirstEntityOfType(passageType).getId()
    );
  }

  hasPassage(entity: Passage): boolean {
    let response = false;

    this.getConnections().forEach((item) => {
      if (item.passageId === entity.getId()) {
        response = true;
      }
    });

    return response;
  }

  getPassageFor(connection: Connection): Passage {
    return (
      connection.passageId
        ? this.getPlay().getEntity(connection.passageId)
        : null
    ) as Passage;
  }

  onVisitedBy(entity: MaterialEntity): void {
    if (entity instanceof Character) {
      entity.addKnownEntity(this.getType());
    }
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

  getRegion(): Region {
    return null;
  }

  protected connectionLeadsTo(
    connection: Connection,
    type: EntityType
  ): boolean {
    return this.getPlay().getEntity(connection.destinationId).isOfType(type);
  }
}
