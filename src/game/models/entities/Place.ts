import { Name } from 'src/game/models/Name';
import { NameWrapper } from './../Text';
import { TextWrapper } from 'src/game/models/Text';
import { EntityType } from 'src/game/models/Entity';
import { EntityId } from '../Entity';
import { Section } from '../Section';
import { Material } from './Material';
import { DiractionKey } from 'src/game/dictionnaries/Direction';

export type Connection = {
  destinationId: EntityId;
  text: TextWrapper;
  directionKey: DiractionKey;
  doorId?: EntityId;
  check?: () => boolean;
  distance?: number;
};

export abstract class Place extends Material {
  connections: Connection[] = [];

  exit(exit: Connection): void {
    this.getPlay()
      .getPlayer()
      .moveTo(this.getPlay().getEntity(exit.destinationId));
  }

  addConnection(connection: Connection): void {}

  getSection(): Section {
    return null;
  }

  exitTo(type: EntityType): void {
    const entity = this.getPlay().getFirstEntityOfType(type);
    this.getPlay().getPlayer().moveTo(entity);
  }
}
