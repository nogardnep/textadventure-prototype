import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Name } from 'src/game/core/models/Name';
import { Scenary } from 'src/game/modules/base/models/entities/material/thing/Scenary';

export class Fortress extends Scenary {
  getName() {
    return new Name('la forteresse', { feminin: true, properNoun: true });
  }

  getFullDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'Un château fait de grossières pierres noires, surmonté de trois hautes tours.',
      },
    ];
  }
}
