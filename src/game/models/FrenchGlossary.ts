import { Gender, Glossary, Person } from './Glossary';

export abstract class FrenchGlossary extends Glossary {
  getPerson(followedByVowel = false): string {
    let found = '';

    switch (Glossary.person) {
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
        switch (Glossary.gender) {
          case Gender.Male:
            found = 'il';
            break;
          case Gender.Femal:
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
        switch (Glossary.gender) {
          case Gender.Male:
            found = 'ils';
            break;
          case Gender.Femal:
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
