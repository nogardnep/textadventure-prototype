import { Name } from 'src/game/core/models/Name';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

export class Giant extends Character {
  getName() {
    return { fr: new Name('géant') };
  }
}
