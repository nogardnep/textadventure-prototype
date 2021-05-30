type NameProps = {
  feminin?: boolean;
  plural?: boolean;
  pluralName?: string;
  properNoun?: boolean;
  elision?: boolean;
  invariable?: boolean;
};

export class Name {
  coreName: string;
  props: NameProps;

  constructor(coreName: string, props?: NameProps) {
    this.coreName = coreName;

    this.props = {};

    if (props != null && props.feminin !== undefined) {
      this.props.feminin = props.feminin;
    } else {
      this.props.feminin = false;
    }

    if (props != null && props.plural !== undefined) {
      this.props.plural = props.plural;
    } else {
      this.props.plural = false;
    }

    if (props != null && props.pluralName !== undefined) {
      this.props.pluralName = props.pluralName;
    } else {
      this.props.pluralName = null;
    }

    if (props != null && props.properNoun !== undefined) {
      this.props.properNoun = props.properNoun;
    } else {
      this.props.properNoun = false;
    }

    if (props != null && props.elision !== undefined) {
      this.props.elision = props.elision;
    } else {
      this.props.elision = false;
    }

    if (props != null && props.invariable !== undefined) {
      this.props.invariable = props.invariable;
    } else {
      this.props.invariable = false;
    }
  }

  isFeminin(): boolean {
    return this.props.feminin;
  }

  needsEllision(): boolean {
    return this.props.elision || this.beginsWithVowel();
  }

  printSimple(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(this.coreName, capitalizeFirstLetter);
  }

  printPlural(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(this.getPlural(), capitalizeFirstLetter);
  }

  printPluralWithDefiniteArticle(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(
      this.getDefiniteArticle(true) + this.getPlural(),
      capitalizeFirstLetter
    );
  }

  printPluralWithIndefiniteArticle(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(
      this.getIndefiniteArticle(true) + this.getPlural(),
      capitalizeFirstLetter
    );
  }

  printWithDefiniteArticle(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(
      this.getDefiniteArticle() + this.coreName,
      capitalizeFirstLetter
    );
  }

  printWithIndefiniteArticle(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(
      this.getIndefiniteArticle() + this.coreName,
      capitalizeFirstLetter
    );
  }

  printWithPreposition(capitalizeFirstLetter?: boolean): string {
    return this.printWithCaptial(
      this.getPreposition() + this.coreName,
      capitalizeFirstLetter
    );
  }

  getSystemName(): string {
    return this.coreName.replace(' ', '_').toLowerCase();
  }

  getPlural(): string {
    let pluralName: string;

    if (this.props.invariable) {
      pluralName = this.coreName;
    } else if (this.props.pluralName !== null) {
      pluralName = this.props.pluralName;
    } else {
      pluralName = this.coreName + 's';
    }

    return pluralName;
  }

  getPreposition(forPlural?: boolean): string {
    let preposition: string;

    // TODO: which is good?

    // if (this.props.properNoun) {
    //   if (this.props.plural || (forPlural && !this.props.invariable)) {
    //     preposition = 'aux ';
    //   } else if (this.props.feminin) {
    //     preposition = 'en ';
    //   } else {
    //     preposition = 'au ';
    //   }
    // } else {
    //   preposition = 'au ' + this.getDefiniteArticle(forPlural);
    // }

    if (this.props.properNoun) {
      if (this.props.plural || (forPlural && !this.props.invariable)) {
        preposition = 'aux ';
      } else if (this.props.feminin) {
        preposition = 'en ';
      } else {
        preposition = 'au ';
      }
    } else {
      if (this.props.elision) {
        preposition = "à l'";
      } else if (this.props.feminin) {
        preposition = 'à la ';
      } else {
        preposition = 'au ';
      }
    }

    return preposition;
  }

  getIndefiniteArticle(forPlural?: boolean): string {
    let article: string;

    if (this.props.properNoun) {
      article = '';
    } else {
      if (this.props.invariable) {
        if (this.props.feminin) {
          article = 'de la ';
        } else if (this.needsEllision()) {
          article = "de l'";
        } else {
          article = 'du';
        }
      } else if (this.props.plural || (forPlural && !this.props.invariable)) {
        article = 'des ';
      } else if (this.props.feminin) {
        article = 'une ';
      } else {
        article = 'un ';
      }
    }

    return article;
  }

  getDefiniteArticle(forPlural?: boolean): string {
    let article: string;

    if (!this.props.properNoun) {
      if (this.props.plural || (forPlural && !this.props.invariable)) {
        article = 'les ';
      } else if (this.needsEllision()) {
        article = "l'";
      } else if (this.props.feminin) {
        article = 'la ';
      } else {
        article = 'le ';
      }
    } else {
      article = '';
    }

    return article;
  }

  getObjectComplement(forPlural?: boolean): string {
    let complement: string;

    if (this.props.plural || (forPlural && !this.props.invariable)) {
      if (this.props.feminin) {
        complement = 'elles';
      } else {
        complement = 'eux';
      }
    } else if (this.props.feminin) {
      complement = 'elle';
    } else {
      complement = 'lui';
    }

    return complement;
  }

  getPronoun(forPlural?: boolean): string {
    let pronoun: string;

    if (this.props.plural || (forPlural && !this.props.invariable)) {
      if (this.props.feminin) {
        pronoun = 'elles';
      } else {
        pronoun = 'ils';
      }
    } else if (this.props.feminin) {
      pronoun = 'elle';
    } else {
      pronoun = 'il';
    }

    return pronoun;
  }

  private printWithCaptial(
    given: string,
    capitalizeFirstLetter?: boolean
  ): string {
    let toPrint: string;

    if (capitalizeFirstLetter !== undefined && capitalizeFirstLetter) {
      toPrint = given.charAt(0).toUpperCase() + given.slice(1);
    } else {
      toPrint = given;
    }

    return toPrint;
  }

  private beginsWithVowel(): boolean {
    return this.isVowel(this.coreName.charAt(0));
  }

  private isVowel(letter: string): boolean {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(letter.toLowerCase()) !== -1;
  }
}
