import { TextWrapper, NameWrapper } from './models/Text';
import { Name } from './models/Name';

export abstract class TextManager {
  static language = ['fr', 'en']; // TODO: move

  static printText(text: TextWrapper): string {
    let toPrint: string = null;

    this.language
      .slice()
      .reverse()
      .forEach((item: string) => {
        const found = text[item];

        if (found) {
          toPrint = found;
        }
      });

    if (!toPrint) {
      toPrint = '(missing text)';
    }

    return toPrint;
  }

  static getName(text: NameWrapper): Name {
    let name: Name = null;

    this.language
      .slice()
      .reverse()
      .forEach((item: string) => {
        const found = text[item];

        if (found) {
          name = found;
        }
      });

    return name;
  }
}
