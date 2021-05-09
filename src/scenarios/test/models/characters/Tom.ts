import { Play } from 'src/game/core/models/Play';
import { TestScenario } from '../../TestScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';
import { resolveTripleslashReference } from 'typescript';

export class Tom extends Character {
  alearyAsked = false;

  constructor(play: Play) {
    super(play);

    this.name = 'Tom';
    this.dead = false;
  }

  init() {
    const helmet = this.giveChildOfType(
      TestScenario.entityConstructors.Helmet.name,
      true
    ) as WearableObject;
    helmet.puttedBy(this);
  }

  // getFullImages() {
  //   return [
  //     { image: TestScenario.images.sky },
  //     { image: TestScenario.images.monster },
  //   ];
  // }

  // getPreviewImage() {
  //   return TestScenario.images.monster;
  // }

  getConversationSubjects() {
    return [
      {
        title: { fr: 'lui' },
        onAsked: () => {
          this.alearyAsked = true;
          this.save();
          this.getPlay().inform([

          ])
        },
        check: () => {
          return true;
          return !this.alearyAsked;
        },
      },
    ];
  }
}
