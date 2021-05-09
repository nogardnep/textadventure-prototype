import { Audio } from 'src/game/core/models/Audio';

const audioPath = 'scenarios/audios';

export const AUDIOS = {
  birds: new Audio(audioPath + '/birds.wav', 0.2),
  ghost: new Audio(audioPath + '/ghost.wav', 0.2),
  demon: new Audio(audioPath + '/demon.wav', 0.2),
};
