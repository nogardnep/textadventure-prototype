import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';

export class PrescienceSpell extends Spell {
  getName() {
    return new Name('préscience',{
      properNoun: true
    });
  }
}
