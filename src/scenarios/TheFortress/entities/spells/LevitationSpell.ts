import { Name } from 'src/game/core/models/Name';
import { ExteriorSpell } from './ExteriorSpell';

export class LevitationSpell extends ExteriorSpell {
  getName() {
    return new Name('levitation', {
      properNoun: true,
    });
  }
}
