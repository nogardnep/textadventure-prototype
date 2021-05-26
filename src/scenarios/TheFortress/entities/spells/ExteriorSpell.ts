import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

export abstract class ExteriorSpell extends Spell {
  castedBy(author: Character) {
    const target = author.getParent();
    return target.affectedBySpell(author, this);
  }
}
