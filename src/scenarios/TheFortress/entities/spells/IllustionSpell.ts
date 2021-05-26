import { Name } from 'src/game/core/models/Name';
import { ExteriorSpell } from './ExteriorSpell';

export class IllusionSpell extends ExteriorSpell {
  getName() {
    return new Name('illusion', {
      properNoun: true,
    });
  }
}
