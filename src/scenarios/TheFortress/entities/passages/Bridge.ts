import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Passage } from 'src/game/modules/base/models/entities/material/thing/Passage';
import { TheFortress } from '../../TheFortress';
import { Giant } from '../characters/Giant';

// TODO: delete
export class Bridge extends Passage {
  getName() {
    return new Name('pont');
  }

  init() {
    this.getGiant().moveTo(this);
  }

  getPreviewDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        items: [
          { text: "mène à l'entrée de " },
          {
            text: 'la forteresse',
            entity: this.getPlay().getFirstEntityOfType(
              TheFortress.entityConstructors.Fortress.name
            ),
          },
        ],
      },
    ];
  }

  isKept(): boolean {
    return this.isOwning(this.getGiant(), true) && !this.getGiant().isDead();
  }

  getGiant(): Giant {
    return this.getPlay().getFirstEntityOfType(
      TheFortress.entityConstructors.Giant.name,
      true
    ) as Giant;
  }
}
