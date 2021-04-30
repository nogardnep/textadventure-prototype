import { Narration } from './Narration';
import { EntityId, StoredEntity } from './Entity';

export class Play {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: Narration;
  time: number;

  constructor() {
    this.storedEntities = {};
    this.playerId = null;
    this.narration = {
      sections: [],
    };
    this.time = 0;
  }
}
