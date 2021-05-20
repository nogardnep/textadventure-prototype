import { Name } from './Name';
import { NameWrapper, TextManager } from '../TextManager';
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
  protected missingText: string;
  protected phrases: { [key: string]: (args: any[]) => string };

  constructor(
    phrases: { [key: string]: (args: any[]) => string },
    missingText: string
  ) {
    this.phrases = phrases;
    this.missingText = missingText;
  }

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

  // protected extractName(name: NameWrapper): Name {
  //   return TextManager.extractName(name);
  // }

  setPharses(phrases: { [key: string]: (args: any[]) => string }): void {
    Object.assign(this.phrases, phrases);
  }

  getPhrase(key: string, args: any[]): string {
    let phrase: string;

    if (this.phrases[key]) {
      phrase = this.phrases[key](args);
    } else {
      phrase = this.missingText;
    }

    return phrase;
  }

  getName(key: string, args: any[]): Name {
    return null;
  }
}
