import { Entity } from "src/game/models/Entity";
import { FrenchBaseGlossary } from "src/game/models/FrenchBaseGlossary";

export class ModifiedFrenchBaseGlossary extends FrenchBaseGlossary {
  outOfReach(entity: Entity): string {
    return this.asSentence("vous ne pouvez atteindre cela");
  }
}
