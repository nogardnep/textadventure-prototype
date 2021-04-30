import { entityConstructors } from './../../TestScenario';
import { EntityId } from 'src/game/models/Entity';
import { Spell } from "src/game/models/entity/Spell";
import { Name } from "src/game/models/Name";
import { GameController } from 'src/game/GameController';

export class DestructionSpell extends Spell {
  getName() {
    return { fr: new Name('destruction') };
  }
}
