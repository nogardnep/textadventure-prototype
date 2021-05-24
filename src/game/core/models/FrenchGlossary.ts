import { Gender } from '../dictionnaries/Gender';
import { Glossary, Person } from './Glossary';

export abstract class FrenchGlossary extends Glossary {

  getPerson(followedByVowel = false): string {
    let found = '';

    switch (Glossary.receiverPerson) {
      case Person.FirstPersonSingular:
        switch (followedByVowel) {
          case true:
            found = "j'";
            break;
          case false:
            found = 'je';
            break;
        }
        break;
      case Person.SecondPersonSingular:
        found = 'tu';
        break;
      case Person.ThirdPersonSingular:
        switch (Glossary.receiverGender) {
          case Gender.Male:
            found = 'il';
            break;
          case Gender.Female:
            found = 'elle';
            break;
          case Gender.Thing:
            switch (followedByVowel) {
              case true:
                found = "c'";
                break;
              case false:
                found = 'ça';
                break;
            }
            break;
        }
        break;
      case Person.FirstPersonPlural:
        found = 'nous';
        break;
      case Person.SecondPersonPlural:
        found = 'vous';
        break;
      case Person.ThirdPersonPlural:
        switch (Glossary.receiverGender) {
          case Gender.Male:
            found = 'ils';
            break;
          case Gender.Female:
            found = 'elles';
            break;
          case Gender.Thing:
            found = 'ils';
            break;
        }
        break;
    }

    return found;
  }
}
