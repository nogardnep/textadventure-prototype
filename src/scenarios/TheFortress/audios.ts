import { Audio } from 'src/game/core/models/Audio';

const imagePath = 'scenarios/audios';

export const AUDIO = {
  toctoc: new Audio(imagePath + '/toctoc.wav', 1),
  birds: new Audio(imagePath + '/birds.wav', 1),
};
