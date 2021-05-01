import { EntityType } from 'src/game/models/Entity';
import { Entity, EntityId } from '../Entity';
import { GameController } from './../../GameController';
import { Section } from './../Section';

export type Exit = {
  destinationId: EntityId;
  text: string;
  doorId?: EntityId;
};

export abstract class Room extends Entity {
  exits: Exit[] = [];

  exit(exit: Exit): void {
    GameController.getPlay()
      .getPlayer()
      .moveTo(GameController.getPlay().getEntity(exit.destinationId));
  }

  getSection(): Section {
    return null;
  }

  exitTo(type: EntityType): void {
    const entity = GameController.getPlay().getFirstEntityOfType(type);
    GameController.getPlay().getPlayer().moveTo(entity);
  }
}
