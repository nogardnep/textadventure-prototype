import { Entity } from 'src/game/core/models/Entity';
import { FrenchGlossary } from 'src/game/core/models/FrenchGlossary';
import { UsuableObject } from '../entities/material/thing/UsuableObject';
import { BaseGlossaryKey } from './../BaseGlossary';

export class FrenchBaseGlossary extends FrenchGlossary {
  constructor() {
    super(
      {
        notOwned: (args: any[]) => {
          return this.asSentence('vous ne possedez pas cela');
        },
        allHandsUsed: (args: any[]) => {
          return this.asSentence('toutes vos mains sont prises');
        },
        fixed: (args: any[]) => {
          return null;
        },
        alreadyOwned: (args: any[]) => {
          return null;
        },
        notTakable: (args: any[]) => {
          return null;
        },
        nothingToSayAboutEntity: (args: any[]) => {
          const entity = args[0] as Entity;
          return this.asSentence(
            'rien de particulier concernant ' +
              entity.getName().printWithDefiniteArticle()
          );
        },
        outOfReach: (args: any[]) => {
          return this.asSentence("c'est hors d'atteinte");
        },
        somethingAlreadyWorn: (args: any[]) => {
          return null;
        },
        take: (args: any[]) => {
          const target = args[1] as UsuableObject;
          return this.asSentence(
            'vous prenez ' + target.getName().printWithDefiniteArticle()
          );
        },
        unusefulSpell: (args: any[]) => {
          return this.asSentence('ce sortilège est sans effet ici');
        },
        getPhrase: (args: any[]) => {
          return null;
        },
      } as { [key in BaseGlossaryKey]: (args: any[]) => string },
      '(texte manquant)'
    );
  }
}
