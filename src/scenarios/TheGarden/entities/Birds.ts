import { ShootableObject } from './../../../game/modules/base/models/entities/material/thing/object/ShootableObject';
import { Name } from 'src/game/core/models/Name';
import { Scenary } from 'src/game/modules/base/models/entities/material/thing/Scenary';
import { BASE_ACTIONS } from 'src/game/modules/base/dictionnaries/actions';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Bow } from './Bow';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

export class Birds extends Scenary {
  getName() {
    return new Name('oiseaux', { plural: true });
  }

  getDisplayedActions() {
    return super.getDisplayedActions().concat([BASE_ACTIONS.Shooting.name]);
  }

  shootedBy(author: Character, weapon: ShootableObject) {
    if (author.isThePlayer()) {
      this.getPlay()
        .getOutputs()
        .onMessageSend({
          paragraphs: [
            { tag: ParagraphTag.Event, text: 'Vous abattez un oiseau.' },
          ],
        });
    }

    return { success: true };
  }
}
