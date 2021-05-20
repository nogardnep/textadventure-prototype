import { Name } from 'src/game/core/models/Name';
import { Scenary } from 'src/game/modules/base/models/entities/material/thing/Scenary';

export class Torrent extends Scenary {
  getName() {
    return new Name('torrent');
  }

  getExteriorDescription() {
    return [
      {
        text:
          'Le courent est violent. Il serait impossible de le traverser à la nage.',
      },
    ];
  }
}
