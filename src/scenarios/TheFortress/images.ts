import { Image } from 'src/game/core/models/Image';

const imagePath = 'scenarios/images';

export const IMAGES = {
  moutainousPath: new Image({
    source: imagePath + '/scenes/scene-1.png',
    frames: {
      width: 715,
      height: 536,
      count: 1,
    },
  }),
  sky2: new Image({
    source: imagePath + '/backgrounds/sky-2.png',
    frames: {
      width: 12500 / 25,
      height: 224,
      count: 25,
    },
  }),
  giant: new Image({
    source: imagePath + '/characters/giant.png',
    frames: {
      width: 500,
      height: 500,
      count: 1,
    },
  }),
};
