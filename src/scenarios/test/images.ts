import { Image } from 'src/game/core/models/Image';

const imagePath = 'scenarios/images';

export const IMAGES = {
  swordFull: new Image({
    source: imagePath + '/sword.gif',
    frames: {
      width: 100,
      height: 100,
      count: 1,
    },
  }),
  swordPreview: new Image({
    source: imagePath + '/diamond-001-sprite.png',
    frames: {
      width: 10,
      height: 10,
      count: 1,
    },
  }),
  castle1Full: new Image({
    source: imagePath + '/castle-1.png',
    frames: {
      width: 512,
      height: 278,
      count: 1,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
  }),
  castle2Full: new Image({
    source: imagePath + '/castle-2.png',
    frames: {
      width: 1024,
      height: 640,
      count: 1,
    },
  }),
  sky: new Image({
    source: imagePath + '/sky-001-sprite.png',
    frames: {
      width: 4000 / 8,
      height: 2000 / 5,
      count: 8 * 5 - 1,
    },
    speed: 1
  }),
  monster: new Image({
    source: imagePath + '/monster.png',
    frames: {
      width: 320 / 4,
      height: 320 / 4,
      count: 4,
    },
    speed: 0.5
  }),
};
