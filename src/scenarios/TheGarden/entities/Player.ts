import { Name } from 'src/game/core/models/Name';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

export class Player extends Character {
  getName() {
    return new Name('vous', { properNoun: true });
  }
}
