import { Name } from './../../../Name';
import { Thing } from 'src/game/models/entities/material/Thing';

export class Passage extends Thing {
  getName() {
    return { fr: new Name('passage') };
  }
}
