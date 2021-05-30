import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { BaseCaracteristicKey } from 'src/game/modules/base/dictionnaries/caracteristics';
import { Effect } from 'src/game/modules/base/models/entities/immaterial/Effect';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

export class MagicalProtection extends Effect {
  delay = 0;

  getName() {
    return new Name('protection magique', {
      feminin: true,
    });
  }

  update() {
    const duration = 20;

    this.delay += this.getPlay().getPassedTime();

    if (this.delay >= duration) {
      this.delay = 0;

      (this.getOwner() as MaterialEntity).removeEffectsOfTypes([
        this.getType(),
      ]);

      if (this.getOwner().isThePlayer()) {
        this.getPlay().sendMessage({
          paragraphs: [
            {
              tag: ParagraphTag.Warning,
              text: "Le sort de protection s'est épuisé.",
            },
          ],
        });
      }
    }
  }

  getModifiers() {
    return {
      [BaseCaracteristicKey.Resistance]: {
        value: 5,
      },
    };
  }
}
