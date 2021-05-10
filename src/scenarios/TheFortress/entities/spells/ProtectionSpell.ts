import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';

export class ProtectionSpell extends Spell {
  getName() {
    return { fr: new Name('protection') };
  }
}
