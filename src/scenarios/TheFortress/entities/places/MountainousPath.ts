import { Name } from 'src/game/core/models/Name';
import { Place } from 'src/game/modules/base/models/entities/material/Place';

export class MountainousPath extends Place {
  getName() {
    return { fr: new Name('Sentier') };
  }
}
