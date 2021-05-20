import { Name } from 'src/game/core/models/Name';
import { Play } from 'src/game/core/models/Play';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';

export class Sword extends HoldableObject {
  constructor(play: Play) {
    super(play);
  }

  getName() {
    return  new Name('épee') ;
  }

  // getFullImages() {
  //   return [{ image: TestScenario.images.swordFull }];
  // }

  // getPreviewImage() {
  //   return TestScenario.images.swordPreview;
  // }
}
