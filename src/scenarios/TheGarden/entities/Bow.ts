import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Name } from 'src/game/core/models/Name';
import { ShootableObject } from 'src/game/modules/base/models/entities/material/thing/object/ShootableObject';

export class Bow extends ShootableObject {
  getName() {
    return new Name('arc');
  }

  getFullDescription() {
    return [{ tag: ParagraphTag.Description, text: 'Un arc en bois.' }];
  }
}
