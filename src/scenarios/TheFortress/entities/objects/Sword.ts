import { Name } from 'src/game/core/models/Name';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';

export class Sword extends HoldableObject {
  getName() {
    return new Name('épée', { feminin: true, elision: true });
  }
}
