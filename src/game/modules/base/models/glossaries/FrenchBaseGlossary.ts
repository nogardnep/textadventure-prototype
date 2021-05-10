import { Entity } from 'src/game/core/models/Entity';
import { FrenchGlossary } from 'src/game/core/models/FrenchGlossary';
import { TextManager } from 'src/game/core/TextManager';
import { UsuableObject } from '../entities/material/thing/UsuableObject';
import { BaseGlossary, BaseGlossaryKey } from './../BaseGlossary';

export class FrenchBaseGlossary extends FrenchGlossary implements BaseGlossary {
  outOfReach(entity: Entity): string {
    return this.asSentence("c'est hors d'atteinte");
  }
  alreadyOwned(entity: Entity): string {
    let phrase = '';

    return this.asSentence(this.getPerson() + "vous l'avez déjà");
  }
  fixed(entity: Entity): string {
    return this.asSentence(
      this.extractName(entity.getName()).printSimple() + ' est immobile'
    );
  }
  notTakable(entity: Entity): string {
    return this.asSentence('vous ne pouvez prendre une telle chose');
  }

  getPhrase(key: string, args: any[]) {
    let phrase: string = '(texte manquant)';

    switch (key) {
      case BaseGlossaryKey.OutOfReach:
        phrase = this.asSentence("c'est hors d'atteinte");
        break;

      case BaseGlossaryKey.Take:
        const target = args[1] as UsuableObject;
        phrase = this.asSentence(
          'vous prenez ' +
            TextManager.extractName(target.getName()).printWithDefiniteArticle()
        );
        break;

      case BaseGlossaryKey.AllHandsUsed:
        phrase = this.asSentence('toutes vos mains sont prises')
        break;
    }

    return phrase;
  }
}
