import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Name } from 'src/game/core/models/Name';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { TheFortress } from '../../TheFortress';

export class ProtectionSpell extends Spell {
  getName() {
    return new Name('protection', {
      properNoun: true,
    });
  }

  castedBy(author: Character) {
    author.giveEffectOfType(
      TheFortress.entityConstructors.MagicalProtection.name
    );

    return {
      message: 'Vous créez autour de vous une barrière magique.',
      success: true,
    };
  }
}
