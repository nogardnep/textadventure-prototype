import { Name } from 'src/game/core/models/Name';
import { ExteriorSpell } from './ExteriorSpell';

export class ControlSpell extends ExteriorSpell {
  getName() {
    return new Name('maîtrise', {
      properNoun: true,
    });
  }
}
