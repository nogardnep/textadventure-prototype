import { Name } from './../../../game/models/Name';
import { Character } from './../../../game/models/entity/Character';

export class Player extends Character {
  getName() {
    return { fr: new Name('Player') };
  }
}
