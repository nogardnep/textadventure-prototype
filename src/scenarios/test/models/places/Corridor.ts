import { Name } from 'src/game/core/models/Name';
import { TestScenario } from '../../TestScenario';
import { Place } from 'src/game/modules/base/models/entities/material/Place';

export class Corridor extends Place {
  toogle = false;

  getName() {
    return new Name('Corridor ' + this.toogle);
  }

  // getInteriorDescription() {
  //   return [{ text: { fr: 'Un long couloir.' } }];
  // }

  // getFullImages() {
  //   return [{ image: TestScenario.images.castle2Full }];
  // }

  // getAudioAmbiance() {
  //   return [
  //     { audio: TestScenario.audios.demon },
  //   ];
  // }

  getChoices() {
    return [
      {
        text: 'go to chamber',
        proceed: () => {
          this.exitToPlace(TestScenario.entityConstructors.Chamber.name);
        },
      },
    ];
  }
}
