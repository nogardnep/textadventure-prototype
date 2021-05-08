import { Name } from '../../../Name';
import { Thing } from 'src/game/models/entities/material/Thing';
import { EntityId } from 'src/game/models/Entity';

export class Passage extends Thing {

  getName() {
    return { fr: new Name('passage') };
  }
}
