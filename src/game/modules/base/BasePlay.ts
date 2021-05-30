import { EntityId, EntityType } from 'src/game/core/models/Entity';
import { Play, PlayOutputs } from 'src/game/core/models/Play';
import { BaseEntity } from './models/BaseEntity';
import { BaseScenario } from './models/BaseScenario';
import { Character } from './models/entities/material/Character';
import { MaterialEntity } from './models/entities/MaterialEntity';

export type BasePlayOutputs = {
  onStartConversation: (interlocutor: Character) => void;
  onLookingAt: (author: Character, target: BaseEntity) => void;
  onMoving: (entity: MaterialEntity, destination: MaterialEntity) => void;
} & PlayOutputs;

export class BasePlay extends Play {
  constructor(scenario: BaseScenario, outputs: BasePlayOutputs) {
    super(scenario, outputs);
  }

  addEntity(type: EntityType): BaseEntity {
    const entity = super.addEntity(type) as BaseEntity;

    entity.makeContent();

    return entity;
  }

  getEntity(id: EntityId): BaseEntity {
    return super.getEntity(id) as BaseEntity;
  }

  getScenario(): BaseScenario {
    return super.getScenario() as BaseScenario;
  }

  startConversation(interlocutor: Character): void {
    this.getOutputs().onStartConversation(interlocutor);
  }

  getPlayer(): Character {
    return super.getPlayer() as Character;
  }

  getOutputs(): BasePlayOutputs {
    return super.getOutputs() as BasePlayOutputs;
  }
}
