import { Spell } from 'src/game/models/entities/Spell';
import { Name } from 'src/game/models/Name';

export class IllusionSpell extends Spell {
  getName() {
    return { fr: new Name('invocation') };
  }
}
