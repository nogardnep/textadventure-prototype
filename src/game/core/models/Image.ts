type Frames = {
  width: number;
  height: number;
  count: number;
  regX?: number;
  regY?: number;
};

type Scale = {
  x: number;
  y: number;
};

export class Image {
  source: string;
  frames: Frames;
  scale: Scale;
  speed: number;
  animation: {};

  constructor(params: {
    source: string;
    frames: Frames;
    scale?: Scale;
    speed?: number;
  }) {
    this.frames = params.frames;
    this.source = params.source;
    this.scale = params.scale !== undefined ? params.scale : { x: 1, y: 1 };
    this.speed = params.speed !== undefined ? params.speed : 1;
    this.animation = {};

    this.frames.regX = this.frames.regX
      ? this.frames.regX
      : this.frames.width / 2;

    this.frames.regY = this.frames.regY ? this.frames.regY : this.frames.height;
  }
}
