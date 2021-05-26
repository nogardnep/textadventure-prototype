import { EnglishGlossary } from 'src/game/core/models/EnglishGlossary';
import { Entity } from 'src/game/core/models/Entity';
import { BaseGlossaryKey } from '../BaseGlossary';
import { UsuableObject } from '../entities/material/thing/UsuableObject';

export class EnglishBaseGlossary extends EnglishGlossary {
  constructor() {
    super(
      {
        notOwned: (args: any[]) => {
          return this.asSentence('you do not own that');
        },
        allHandsUsed: (args: any[]) => {
          return this.asSentence('all your hands are taken');
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
            'nothing to say about ' +
              entity.getName().printWithDefiniteArticle()
          );
        },
        outOfReach: (args: any[]) => {
          return this.asSentence('it is out of reach');
        },
        somethingAlreadyWorn: (args: any[]) => {
          return null;
        },
        take: (args: any[]) => {
          const target = args[1] as UsuableObject;
          return this.asSentence(
            'you take ' + target.getName().printWithDefiniteArticle()
          );
        },
        unusefulSpell: (args: any[]) => {
          return this.asSentence('this spell has no effect here');
        },
        getPhrase: (args: any[]) => {
          return null;
        },
      } as { [key in BaseGlossaryKey]: (args: any[]) => string },
      '(missing text)'
    );
  }
}
