import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { TheFortress } from './../../TheFortress';

export class Giant extends Character {
  init() {
    this.giveChildOfType(TheFortress.entityConstructors.Helmet.name, false);
  }

  getName() {
    return new Name('géant');
  }

  getPreviewDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'assis',
        check: () => {
          return this.isOnTheBridge() && !this.dead;
        },
      },
      {
        tag: ParagraphTag.Description,
        text: 'ne vous quittant pas des yeux',
        check: () => {
          return this.isOnTheBridge() && !this.dead;
        },
      },
      {
        tag: ParagraphTag.Description,
        text: 'gîsant là',
        check: () => {
          return this.isOnTheBridge() && this.dead;
        },
      },
    ];
  }

  getFullDescription() {
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

  getConversationResponses(author: Character) {
    return {
      [this.getType()]: {
        text:
          "J'ai été enchaîné ici par le sorcier " +
          this.getSorcerersName() +
          ". Je dois garder ce pont. La liberté m'a été promise si je m'acquitte pour trente ans de cette charge.",
        onAsked: (author: Character) => {
          author.addKnownEntity(TheFortress.entityConstructors.Azkarar.name);
        },
      },
      [TheFortress.entityConstructors.Azkarar.name]: {
        text:
          this.getSorcerersName() +
          " est le seigneur de ce domaine. Personne n'est autorisé à y pénéter sans sa permission.",
      },
    };
  }

  attackedBy(author: Character) {
    this.getPlay().sendMessage(
      [
        {
          text: "Un furieux combat s'engage.",
          tag: ParagraphTag.Event,
        },
      ],
      [],
      () => {
        this.getPlay().sendMessage([
          {
            text: 'Le géant succombe.',
            tag: ParagraphTag.Event,
          },
        ]);
      }
    );

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
        TheFortress.entityConstructors.Bridge.name
      )
    );
  }
}
