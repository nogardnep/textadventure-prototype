import { StoredNarration } from './Narration';
import { EntityId, StoredEntity } from './Entity';

export class Play {
  storedEntities: { [id: string]: StoredEntity };
  playerId: EntityId;
  narration: StoredNarration;
  time: number;

  constructor() {
    this.storedEntities = {};
    this.time = 0;
    this.narration = { chapters: [] };
  }
}
