import { Entity, EntityId } from '../Entity';
import { GameController } from './../../GameController';
import { Section } from './../Section';

export type Exit = {
  destination: EntityId;
  text: string;
  doorId?: EntityId;
};

export abstract class Room extends Entity {
  exits: Exit[] = [];

  exit(exit: Exit): void {
    GameController.getPlayer().moveTo(
      GameController.getEntity(exit.destination)
    );
  }

  getSection(): Section {
    return null;
  }
}
