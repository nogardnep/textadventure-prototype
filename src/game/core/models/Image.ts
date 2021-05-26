import { Utils } from 'src/game/core/Utils';

export const WINDOW_REFERENCE = {
  width: 500,
  height: 350,
};

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

export type ImageId = string;

export class Image {
  source: string;
  frames: Frames;
  scale: Scale;
  speed: number;
  animation: {};
  id: ImageId;

  constructor(params: {
    source: string;
    frames: Frames;
    scale?: Scale;
    speed?: number;
  }) {
    this.id = Utils.generateId();
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
