export class Audio {
  source: string;
  volume: number;

  constructor(source: string, volume?: number) {
    this.source = source;
    this.volume = volume !== undefined ? volume : 1;
  }
}
