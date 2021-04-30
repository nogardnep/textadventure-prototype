import { Spell } from "src/game/models/entity/Spell";
import { Name } from "src/game/models/Name";

export class InvocationSpell extends Spell {
  getName() {
    return { fr: new Name('illusion') };
  }
}
