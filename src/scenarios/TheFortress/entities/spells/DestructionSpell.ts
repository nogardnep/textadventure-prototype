import { Name } from 'src/game/core/models/Name';
import { ExteriorSpell } from './ExteriorSpell';

export class DestructionSpell extends ExteriorSpell {
  getName() {
    return new Name('destruction', {
      properNoun: true,
    });
  }
}
