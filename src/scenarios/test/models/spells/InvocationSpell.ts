import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';

export class InvocationSpell extends Spell {
  getName() {
    return new Name('illusion') ;
  }
}
