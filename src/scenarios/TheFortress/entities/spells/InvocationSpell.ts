import { Name } from 'src/game/core/models/Name';
import { ExteriorSpell } from './ExteriorSpell';

export class InvocationSpell extends ExteriorSpell {
  getName() {
    return new Name('invocation', {
      properNoun: true,
    });
  }
}
