import { NameWrapper } from './Text';
import { Name } from './Name';
import { TextManager } from '../TextManager';
import { Gender } from '../dictionnaries/Gender';

export enum ConjugationTime {
  Present,
  Past,
  Future,
}

export enum Person {
  FirstPersonSingular,
  SecondPersonSingular,
  ThirdPersonSingular,
  FirstPersonPlural,
  SecondPersonPlural,
  ThirdPersonPlural,
}

export abstract class Glossary {
  static conjugationTime: ConjugationTime;
  static receiverPerson: Person;
  static receiverGender: Gender;

  static setConjugationTime(conjugationtime: ConjugationTime) {
    this.conjugationTime = conjugationtime;
  }

  static setReceiverPerson(person: Person) {
    this.receiverPerson = person;
  }

  static setReceiverGender(gender: Gender) {
    this.receiverGender = gender;
  }

  protected asSentence(phrase: string): string {
    phrase = phrase[0].toUpperCase() + phrase.substr(1).toLowerCase();

    const lastCaracter = phrase[phrase.length - 1];

    if (lastCaracter !== '.' && lastCaracter !== '?' && lastCaracter !== '!') {
      phrase += '.';
    }

    return phrase;
  }

  protected extractName(name: NameWrapper): Name {
    return TextManager.extractName(name);
  }
}
