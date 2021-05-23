import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { BASE_SUBJECTS } from './../../../../game/modules/base/dictionnaries/subjects';
import { SUBJECTS } from './../../subjects';
import { TheFortress } from './../../TheFortress';

export class Giant extends Character {
  init() {
    this.giveChildOfType(TheFortress.entityConstructors.Helmet.name, false);
  }

  getName() {
    return new Name('géant');
  }

  getPreviewImage() {
    return TheFortress.images.giant;
  }

  getFullImages() {
    return [{ image: TheFortress.images.giant }];
  }

  getPreviewDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'assis sur le pont',
        check: () => {
          return this.isOnTheBridge() && !this.dead;
        },
      },
      {
        tag: ParagraphTag.Description,
        text: 'ne vous quitte pas des yeux',
        check: () => {
          return this.isOnTheBridge() && !this.dead;
        },
      },
      {
        tag: ParagraphTag.Description,
        text: 'gît sur le pont',
        check: () => {
          return this.isOnTheBridge() && this.dead;
        },
      },
    ];
  }

  getExteriorDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: "Un grand homme hirsute, vêtu de peaux. Des chaînes à ses mains l'attachent au pont.",
      },
      {
        tag: ParagraphTag.Description,
        text: 'Son corps meutri gît sur le sol.',
        check: () => {
          return this.dead;
        },
      },
    ];
  }

  getConversationResponses() {
    return {
      [BASE_SUBJECTS.himself.id]: {
        onAsked: (author: Character) => {
          console.log(author.knownSubjects);

          this.say(
            "J'ai été enchaîné ici par le sorcier " +
              this.getSorcerersName() +
              ". Je dois garder ce pont. La liberté m'a été promise si je m'acquitte pour trente ans de cette charge."
          );
          author.addKnownSubject(TheFortress.subjects.azkarar);
        },
      },
      [SUBJECTS.azkarar.id]: {
        onAsked: (author: Character) => {
          this.say(this.getSorcerersName() + 'est mon maître.');
        },
      },
    };
  }

  attackedBy(author: Character) {
    this.getPlay().sendMessage([
      {
        text: "Le combat s'engage. Le géant succombe.",
        tag: ParagraphTag.Event,
      },
    ]);

    this.kill();

    return {
      success: true,
    };
  }

  private getSorcerersName(): string {
    return this.getPlay()
      .getFirstEntityOfType(TheFortress.entityConstructors.Azkarar.name)
      .getName()
      .printSimple();
  }

  private isOnTheBridge(): boolean {
    return this.getParent().equals(
      this.getPlay().getFirstEntityOfType(
        TheFortress.entityConstructors.Plateau.name
      )
    );
  }
}
