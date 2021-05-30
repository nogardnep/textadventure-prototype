import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { BaseCaracteristicKey } from 'src/game/modules/base/dictionnaries/caracteristics';
import { Wound } from './Wound';

export class ArmWound extends Wound {
  severity = 1;
  delay = 0;

  getName() {
    return new Name('blessure', {
      feminin: true,
    });
  }

  update() {
    const duration = 10;

    this.delay += this.getPlay().getPassedTime();

    if (this.delay >= duration) {
      this.delay = 0;

      if (this.getOwner().isThePlayer()) {
        this.getPlay().sendMessage({
          paragraphs: [
            { tag: ParagraphTag.Warning, text: "Votre blessure s'agrave..." },
          ],
        });
      }

      this.severity += 2;
    }
  }

  getModifiers() {
    return {
      [BaseCaracteristicKey.Life]: {
        value: -this.severity,
      },
    };
  }
}
