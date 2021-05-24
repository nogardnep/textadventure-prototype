import { Gender } from '../dictionnaries/Gender';
import { Glossary, Person } from './Glossary';

export abstract class EnglishGlossary extends Glossary {
  getPerson(): string {
    let found = '';

    switch (Glossary.receiverPerson) {
      case Person.FirstPersonSingular:
        found = "I'";
        break;
      case Person.SecondPersonSingular:
        found = 'thou';
        break;
      case Person.ThirdPersonSingular:
        switch (Glossary.receiverGender) {
          case Gender.Male:
            found = 'he';
            break;
          case Gender.Female:
            found = 'she';
            break;
          case Gender.Thing:
            found = 'it';
            break;
        }
        break;
      case Person.FirstPersonPlural:
        found = 'us';
        break;
      case Person.SecondPersonPlural:
        found = 'you';
        break;
      case Person.ThirdPersonPlural:
        found = 'they';
        break;
    }

    return found;
  }
}
