import { TextWrapper, NameWrapper } from './models/Text';
import { Name } from './models/Name';
import { LANGUAGE_KEYS } from './dictionnaries/Language';

export abstract class TextManager {
  static currentLanguage: string;

  static setLanguage(language: string) {
    this.currentLanguage = language;
  }

  static printText(wrapper: TextWrapper): string {
    let toPrint: string = wrapper[this.currentLanguage];

    if (toPrint === undefined) {
      for (let key in LANGUAGE_KEYS) {
        const found = wrapper[key]

        if (found) {
          toPrint = found;
        }
      }

      if (toPrint === undefined) {
        toPrint = '(missing text)';
      }
    }

    return toPrint;
  }

  static extractName(wrapper: NameWrapper): Name {
    let name: Name = wrapper[this.currentLanguage];

    if (name === undefined ) {
      for (let key in LANGUAGE_KEYS) {
        const found = wrapper[key]

        if (found) {
          name = found;
        }
      }
    }

    return name;
  }
}
