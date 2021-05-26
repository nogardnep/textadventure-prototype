import { Name } from 'src/game/core/models/Name';
import { Container } from 'src/game/modules/base/models/entities/material/thing/object/Container';

export class Chest extends Container {
  getName() {
    return new Name('coffre');
  }
}
