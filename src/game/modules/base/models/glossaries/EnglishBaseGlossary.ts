import { FrenchGlossary } from 'src/game/core/models/FrenchGlossary';
import { TextManager } from 'src/game/core/TextManager';
import { BaseGlossaryKey } from '../BaseGlossary';
import { UsuableObject } from '../entities/material/thing/UsuableObject';

export class EnglishBaseGlossary extends FrenchGlossary {

  getPhrase(key: string, args: any[]) {
    let phrase: string;

    switch (key) {
      case BaseGlossaryKey.OutOfReach:
        phrase = this.asSentence("c'est hors d'atteinte");
        break;

      case BaseGlossaryKey.Take:
        const target = args[1] as UsuableObject;
        phrase = this.asSentence(
          'you take ' +
            TextManager.extractName(target.getName()).printWithDefiniteArticle()
        );
        break;
    }

    return phrase;
  }
}
