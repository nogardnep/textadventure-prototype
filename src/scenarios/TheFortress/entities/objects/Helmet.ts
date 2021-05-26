import { ParagraphTag } from './../../../../game/core/models/Paragraph';
import { Name } from 'src/game/core/models/Name';
import { BaseCaracteristicKey } from 'src/game/modules/base/dictionnaries/caracteristics';
import { EmplacementKey } from 'src/game/modules/base/dictionnaries/emplacement';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';
import { TheFortress } from '../../TheFortress';

export class Helmet extends WearableObject {
  getName() {
    return new Name('casque');
  }

  getPreviewImage() {
    return TheFortress.images.helmetPreview;
  }

  getPreviewDescription() {
    return [{ tag: ParagraphTag.Description, text: 'un casque en fer' }];
  }

  getFullImages() {
    return [{ image: TheFortress.images.helmetFull }];
  }

  getEmplacement() {
    return EmplacementKey.Head;
  }

  getModifiers() {
    return {
      [BaseCaracteristicKey.Resistance]: {
        value: 1,
        check: () => {
          return this.isWorn();
        },
      },
    };
  }
}
