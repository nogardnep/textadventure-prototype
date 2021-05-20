import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';

export class HealingSpell extends Spell {
  getName() {
    return  new Name('guérison',{
      properNoun: true
    }) ;
  }
}
