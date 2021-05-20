import { LanguageKey } from './dictionnaries/Language';
import { Name } from './models/Name';

type Text = string;

export type TextWrapper = {
  fr?: Text;
  en?: Text;
};

export type NameWrapper = {
  fr?: Name;
  en?: Name;
};

export abstract class TextManager {
  static currentLanguageKey: string;

  static setLanguage(language: string) {
    this.currentLanguageKey = language;
  }

  static getLanguageKey(): string {
    return this.currentLanguageKey;
  }

  static printText(wrapper: TextWrapper): string {
    let toPrint = this.extract(wrapper);

    if (toPrint === undefined) {
      toPrint = '(missing text)';
    }

    return toPrint;
  }

  static extractName(wrapper: NameWrapper): Name {
    return this.extract(wrapper);
  }

  static extract(wrapper: { [languageKey: string]: any }): any {
    let toExtract: any = wrapper[this.currentLanguageKey];

    if (toExtract === undefined) {
      for (let key in LanguageKey) {
        const found = wrapper[LanguageKey[key]];

        if (found) {
          toExtract = found;
        }
      }
    }

    return toExtract;
  }
}
