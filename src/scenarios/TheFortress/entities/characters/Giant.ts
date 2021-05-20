import { Image } from 'src/game/core/models/Image';
import { TheFortress } from './../../TheFortress';
import { Name } from 'src/game/core/models/Name';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MessageTag } from 'src/game/core/models/Paragraph';

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
        text: 'assis sur le pont',
        check: () => {
          return this.isOnTheBridge() && !this.dead;
        },
      },
      {
        text: 'ne vous quitte pas des yeux',
        check: () => {
          return this.isOnTheBridge() && !this.dead;
        },
      },
      {
        text: 'gît sur le pont',
        check: () => {
          return this.isOnTheBridge() && this.dead;
        },
      },
    ];
  }

  talkedBy(author: Character) {
    this.getPlay().inform([
      {
        text: "L'homme gigantesque parle d'une voix rude&nbsp;:",
        tag: MessageTag.Event,
      },
      {
        text:
          "- J'ai été enchaîné ici par le sorcier " +
          this.getSorcerersName() +
          ". Je dois garder ce pont. La liberté m'a été promise si je m'acquitte pour trente ans de cette charge.",
        tag: MessageTag.Speech,
      },
    ]);

    return {
      success: true,
    };
  }

  attackedBy(author: Character) {
    this.getPlay().inform([
      {
        text: "Le combat s'engage. Le géant succombe sous vos coups.",
        tag: MessageTag.Event,
      },
    ]);

    this.kill();

    return {
      success: true,
    };
  }

  getExteriorDescription() {
    return [
      {
        text: "Un grand homme hirsute, vêtu de peaux. Des chaînes à ses mains l'attachent au pont.",
      },
      {
        text: 'Son corps meutri gît sur le sol.',
        check: () => {
          return this.dead;
        },
      },
    ];
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
