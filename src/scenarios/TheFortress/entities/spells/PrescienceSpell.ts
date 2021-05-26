import { Name } from 'src/game/core/models/Name';
import { ExteriorSpell } from './ExteriorSpell';

export class PrescienceSpell extends ExteriorSpell {
  getName() {
    return new Name('préscience', {
      properNoun: true,
    });
  }
}
