import { Entity } from 'src/game/core/models/Entity';
import { FrenchBaseGlossary } from 'src/game/modules/base/models/glossaries/FrenchBaseGlossary';

export class ModifiedFrenchBaseGlossary extends FrenchBaseGlossary {
  outOfReach(entity: Entity): string {
    return this.asSentence('vous ne pouvez atteindre cela');
  }
}
