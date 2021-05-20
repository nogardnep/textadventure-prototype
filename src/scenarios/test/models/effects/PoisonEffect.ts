import { Effect } from "src/game/modules/base/models/entities/immaterial/Effect";
import { Name } from "src/game/core/models/Name";

export class PoisonEffect extends Effect {
  getName() {
    return new Name('poison') ;
  }

  getModifiers() {
    return {
      life: { value: -5 },
    };
  }
}
