import { EntityType } from 'src/game/models/Entity';
import { EntityId } from '../Entity';
import { Section } from '../Section';
import { Thing } from './Thing';

export type Exit = {
  destinationId: EntityId;
  text: string;
  doorId?: EntityId;
};

export abstract class Room extends Thing {
  exits: Exit[] = [];

  exit(exit: Exit): void {
    this.getPlay()
      .getPlayer()
      .moveTo(this.getPlay().getEntity(exit.destinationId));
  }

  getSection(): Section {
    return null;
  }

  exitTo(type: EntityType): void {
    const entity = this.getPlay().getFirstEntityOfType(type);
    this.getPlay().getPlayer().moveTo(entity);
  }
}
