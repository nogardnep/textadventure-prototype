import { Name } from 'src/game/core/models/Name';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { TheFortress } from './../../TheFortress';

export class HealingSpell extends Spell {
  getName() {
    return new Name('guérison', {
      properNoun: true,
    });
  }

  castedBy(author: Character) {
    author.removeEffectsOfTypes([TheFortress.entityConstructors.Wound.name]);

    return {
      message: 'Toutes vos blessures sont soignées',
      success: true,
    };
  }
}
