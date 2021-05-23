import { TheFortress } from '../../TheFortress';
import { Name } from 'src/game/core/models/Name';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

export class Elkchten extends Character {
  getName() {
    return new Name('Elkchten', { properNoun: true });
  }

  init() {
    const helmet = this.getPlay().addEntity(
      TheFortress.entityConstructors.Helmet.name
    ) as WearableObject;
    const magicStick = this.getPlay().addEntity(
      TheFortress.entityConstructors.MagicStick.name
    ) as HoldableObject;
    const sword = this.getPlay().addEntity(
      TheFortress.entityConstructors.Sword.name
    ) as HoldableObject;

    helmet.moveTo(this);
    magicStick.moveTo(this);
    sword.moveTo(this);
    helmet.puttedBy(this);
    magicStick.heldBy(this);
    sword.heldBy(this);
  }

  getInteriorDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'Fusce tincidunt a lectus sit amet ullamcorper. Ut gravida enim risus, quis lacinia eros venenatis id. Fusce condimentum neque vitae tristique commodo.',
      },
    ];
  }
}
