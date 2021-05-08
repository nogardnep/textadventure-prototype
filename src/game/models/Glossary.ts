import { NameWrapper } from './Text';
import { Name } from './Name';
import { TextManager } from '../TextManager';

export enum Time {
  Present,
  Past,
}

export enum Person {
  FirstPersonSingular,
  SecondPersonSingular,
  ThirdPersonSingular,
  FirstPersonPlural,
  SecondPersonPlural,
  ThirdPersonPlural,
}

export enum Gender {
  Male,
  Femal,
  Thing,
}

export abstract class Glossary {
  static time: Time;
  static person: Person;
  static gender: Gender;

  static setTime(time: Time) {
    this.time = time;
  }

  static setPerson(person: Person) {
    this.person = person;
  }

  static setGender(gender: Gender) {
    this.gender = gender;
  }

  asSentence(phrase: string): string {
    phrase = phrase[0].toUpperCase() + phrase.substr(1).toLowerCase();

    const lastCaracter = phrase[phrase.length - 1];

    if (lastCaracter !== '.' && lastCaracter !== '?' && lastCaracter !== '!') {
      phrase += '.';
    }

    return phrase;
  }

  extractName(name: NameWrapper): Name {
    return TextManager.extractName(name);
  }
}
