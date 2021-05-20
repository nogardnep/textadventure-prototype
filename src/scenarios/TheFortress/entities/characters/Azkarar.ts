import { Name } from 'src/game/core/models/Name';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

export class Azkarar extends Character {
  getName() {
    return new Name('Azkarar', { properNoun: true });
  }
}
