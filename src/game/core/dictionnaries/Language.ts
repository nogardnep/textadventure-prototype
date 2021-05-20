import { Name } from '../models/Name';
import { NameWrapper } from '../TextManager';

export enum LanguageKey {
  English = 'en',
  French = 'fr',
}

export const LANGUAGE_NAMES: {
  [key in LanguageKey]: NameWrapper;
} = {
  fr: { fr: new Name('français') },
  en: { en: new Name('english') },
};
