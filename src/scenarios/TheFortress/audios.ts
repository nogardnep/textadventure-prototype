import { Audio } from 'src/game/core/models/Audio';

const imagePath = 'scenarios/audios';

export const AUDIO = {
  mountain: new Audio(imagePath + '/mountain.wav', 2),
  rapid: new Audio(imagePath + '/rapid.mp3', 0.5),
  music: new Audio(imagePath + '/music.wav', 1),
};
