import { Name } from "../models/Name";
import { NameWrapper } from "../models/Text";

export enum LanguageKey {
  en,
  fr,
}

export const languageKeys: {
  [key in keyof typeof LanguageKey]: string;
} = {
  en: LanguageKey[LanguageKey.en],
  fr: LanguageKey[LanguageKey.fr],
};

export const languageNames: {
  [key in keyof typeof languageKeys]: NameWrapper;
} = {
  fr: { fr: new Name('français') },
  en: { en: new Name('english') },
};
