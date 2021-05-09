import { Entity } from 'src/game/core/models/Entity';
import { BaseGlossaryKey } from 'src/game/modules/base/models/BaseGlossary';
import { FrenchBaseGlossary } from 'src/game/modules/base/models/glossaries/FrenchBaseGlossary';

export class ModifiedFrenchBaseGlossary extends FrenchBaseGlossary {
  outOfReach(entity: Entity): string {
    return this.asSentence('vous ne pouvez atteindre cela');
  }

  getPhrase(key: string, args: any[]) {
    let phrase: string;

    switch (key) {
    }

    if (!phrase) {
      phrase = super.getPhrase(key, args);
    }

    return phrase;
  }
}
