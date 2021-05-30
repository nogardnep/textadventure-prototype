import { Helmet } from './../objects/Helmet';
import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { TheFortress } from './../../TheFortress';
import { Sword } from './../objects/Sword';

export class Giant extends Character {
  init() {
    (
      this.giveChildOfType(TheFortress.entityConstructors.Sword.name) as Sword
    ).takenBy(this);

    (
      this.giveChildOfType(TheFortress.entityConstructors.Helmet.name) as Helmet
    ).puttedBy(this);

    this.giveChildOfType(TheFortress.entityConstructors.Helmet.name);

    this.giveChildOfType(
      TheFortress.entityConstructors.Chest.name
    ).giveChildrenOfType([
      TheFortress.entityConstructors.Helmet.name,
      TheFortress.entityConstructors.Sword.name,
    ]);
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
          return this.isOnTheBridge() && !this.isDead();
        },
      },
      {
        tag: ParagraphTag.Description,
        text: 'ne vous quittant pas des yeux',
        check: () => {
          return this.isOnTheBridge() && !this.isDead();
        },
      },
      {
        tag: ParagraphTag.Description,
        text: 'gîsant là',
        check: () => {
          return this.isOnTheBridge() && this.isDead();
        },
      },
    ];
  }

  getFullDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'Un grand homme hirsute, vêtu de peaux. Des chaînes à ses mains le retiennent attachés au pont.',
      },
      {
        tag: ParagraphTag.Description,
        text: 'Son corps meutri gît sur le sol.',
        check: () => {
          return this.isDead();
        },
      },
    ];
  }

  getConversationResponses(asker: Character) {
    return {
      [this.getType()]: {
        paragraphs: [
          {
            tag: ParagraphTag.Speech,
            items: [
              {
                text: "J'ai été enchaîné ici par le sorcier ",
              },
              {
                text: this.getSorcerersName(),
                entity: this.getPlay().getFirstEntityOfType(
                  TheFortress.entityConstructors.Azkarar.name
                ),
              },
              {
                text: ". Je dois garder ce pont. La liberté m'a été promise si je m'acquitte pour trente ans de cette charge.",
              },
            ],
          },
        ],
        onAsked: (author: Character) => {
          author.addKnownEntity(TheFortress.entityConstructors.Azkarar.name);
        },
      },
      [TheFortress.entityConstructors.Azkarar.name]: {
        paragraphs: [
          {
            tag: ParagraphTag.Speech,
            text:
              this.getSorcerersName() +
              " est le seigneur de ce domaine. Personne n'est autorisé à y pénéter sans sa permission.",
          },
        ],
      },
    };
  }

  attackedBy(author: Character) {
    this.getPlay().sendMessage({
      paragraphs: [
        {
          text: "Un furieux combat s'engage.",
          tag: ParagraphTag.Event,
        },
      ],
      onRead: () => {
        this.getPlay().sendMessage({
          paragraphs: [
            {
              text: 'Le géant vous blesse au bras.',
              tag: ParagraphTag.Event,
            },
          ],
        });

        author.giveEffectOfType(TheFortress.entityConstructors.ArmWound.name);

        this.getPlay().sendMessage({
          paragraphs: [
            {
              text: 'Le géant succombe.',
              tag: ParagraphTag.Event,
            },
          ],
        });

        this.die();
      },
    });

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
