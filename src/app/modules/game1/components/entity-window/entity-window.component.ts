import {
  AudioService,
  AudioLayerKey,
} from './../../../../services/audio.service';
import { Entity } from 'src/game/core/models/Entity';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as createjs from 'createjs-module';
import { Image } from 'src/game/core/models/Image';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const TICK_EVENT_ID = 'tick';

@Component({
  selector: 'app-entity-window',
  templateUrl: './entity-window.component.html',
  styleUrls: ['./entity-window.component.scss'],
})
export class EntityWindowComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() entity: Entity;
  @ViewChild('container') container: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  id: number;
  empty: boolean;
  canvasWidth: number;
  canvasHeight: number;

  private stage: createjs.Stage;
  // private audioLayer: Layer;

  constructor(private audioService: AudioService) {
    this.entity = null;
    this.stage = null;
    this.empty = false;
    this.id = Math.floor(Math.random() * 10000);
    // this.audioLayer = audioService.createLayer(this.id.toString());
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.entity.getFullImages().length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }

    this.updateCanvas();
    this.updateAudioAmbiance();
  }

  ngAfterViewInit(): void {
    if (!this.empty) {
      this.initCanvas();
      this.updateCanvas();
    }
  }

  ngOnDestroy(): void {
    // this.audioService.removeLayer(this.audioLayer);
    this.removeCanvas();
  }

  private updateAudioAmbiance(): void {
    this.audioService.clearLayer(AudioLayerKey.Ambiance);

    const ambiances = this.entity.getAudioAmbiance();

    if (ambiances) {
      ambiances.forEach((item) => {
        this.audioService.playInLayer(item.audio, AudioLayerKey.Ambiance, true);
      });
    }
  }

  private updateCanvas(): void {
    if (this.stage !== null) {
      this.clearCanvas();
      this.fillCanvas();
    }
  }

  private initCanvas(): void {
    this.stage = new createjs.Stage(this.canvas.nativeElement);
  }

  private clearCanvas(): void {
    createjs.Ticker.removeEventListener(TICK_EVENT_ID, this.tickCanvas);
    this.stage.removeAllChildren();
    this.stage.update();
  }

  private fillCanvas(): void {
    this.entity.getFullImages().forEach((item) => {
      if (!item.check || item.check()) {
        this.stage.addChild(this.createSprite(item.image));
      }
    });

    createjs.Ticker.addEventListener(TICK_EVENT_ID, this.tickCanvas);
  }

  private createSprite(image: Image): createjs.Sprite {
    const STAND_KEY = 'stand';

    const spriteSheet = new createjs.SpriteSheet({
      images: ['assets/' + image.source],
      frames: image.frames,
      animations: {
        [STAND_KEY]: [0, image.frames.count - 1, STAND_KEY, image.speed],
      },
    });

    const sprite = new createjs.Sprite(spriteSheet);
    sprite.scaleX = image.scale.x;
    sprite.scaleY = image.scale.y;
    sprite.x = 0;
    sprite.y = 0;
    sprite.gotoAndPlay(STAND_KEY);

    return sprite;
  }

  private removeCanvas(): void {
    this.clearCanvas();
  }

  private tickCanvas = (event: any) => {
    this.canvas.nativeElement.width = this.container.nativeElement.offsetWidth;
    this.canvas.nativeElement.heigth = this.container.nativeElement.offsetHeight;
    this.stage.regX = -this.canvas.nativeElement.offsetWidth / 2;
    this.stage.regY = -this.canvas.nativeElement.offsetHeight;
    this.stage.update(event);
  };
}
