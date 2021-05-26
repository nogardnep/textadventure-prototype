import { Utils } from 'src/game/core/Utils';

export type AudioId = string;

export class Audio {
  source: string;
  volume: number;
  id: AudioId;

  constructor(source: string, volume?: number) {
    this.id = Utils.generateId();
    this.source = source;
    this.volume = volume !== undefined ? volume : 1;
  }

  getId() {
    return this.id;
  }
}
