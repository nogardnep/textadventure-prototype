import { Name } from "../models/Name";
import { NameWrapper } from "../models/Text";

export enum LanguageKey {
  en,
  fr,
}

export const LANGUAGE_KEYS: {
  [key in keyof typeof LanguageKey]: string;
} = {
  en: LanguageKey[LanguageKey.en],
  fr: LanguageKey[LanguageKey.fr],
};

export const LANGUAGE_NAMES: {
  [key in keyof typeof LanguageKey]: NameWrapper;
} = {
  fr: { fr: new Name('français') },
  en: { en: new Name('english') },
};
