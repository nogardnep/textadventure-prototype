import { Effect } from "src/game/models/entity/Effect";
import { Name } from "src/game/models/Name";

export class PoisonEffect extends Effect {
  getName() {
    return { fr: new Name('poison') };
  }

  getModifiers() {
    return {
      life: { value: -5 },
    };
  }
}
