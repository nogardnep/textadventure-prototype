import { BaseGlossary } from './BaseGlossary';
import { Entity } from './Entity';
import { FrenchGlossary } from './FrenchGlossary';

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
}
