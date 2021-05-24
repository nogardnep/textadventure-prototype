import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as createjs from 'createjs-module';
import { Image, WINDOW_REFERENCE } from 'src/game/core/models/Image';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';

const TICK_EVENT = 'tick';

@Component({
  selector: 'app-entity-window',
  templateUrl: './entity-window.component.html',
  styleUrls: ['./entity-window.component.scss'],
})
export class EntityWindowComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @Input() entity: BaseEntity;
  @ViewChild('container') container: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  empty: boolean = false;
  canvasWidth: number;
  canvasHeight: number;

  private stage: createjs.Stage;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.updateCanvas();
  }

  ngAfterViewInit(): void {
    this.updateCanvas();
  }

  ngOnDestroy(): void {
    if (this.stage) {
      this.clearCanvas();
    }
  }

  private updateCanvas(): void {
    this.checkIfEmpty();

    if (this.stage) {
      this.clearCanvas();
    }

    if (this.canvas && !this.empty) {
      if (!this.stage) {
        this.initCanvas();
      }
      this.fillCanvas();
    }
  }

  private checkIfEmpty(): void {
    if (this.entity.getFullImages().length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
  }

  private initCanvas(): void {
    this.stage = new createjs.Stage(this.canvas.nativeElement);
  }

  private clearCanvas(): void {
    createjs.Ticker.removeEventListener(TICK_EVENT, this.tickCanvas);
    this.stage.removeAllChildren();
    this.stage.update();
  }

  private fillCanvas(): void {
    this.entity.getFullImages().forEach((item) => {
      if (!item.check || item.check()) {
        this.stage.addChild(this.createSprite(item.image));
      }
    });

    createjs.Ticker.addEventListener(TICK_EVENT, this.tickCanvas);
  }

  private tickCanvas = (event: any) => {
    if (this.canvas) {
      this.updateStageSize();
    }

    this.stage.update(event);
  };

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

  private updateStageSize(): void {
    const margin = 20;

    let width = this.container.nativeElement.offsetWidth - margin * 2;

    if (width > WINDOW_REFERENCE.width) {
      width = WINDOW_REFERENCE.width;
    }

    let height = width * (WINDOW_REFERENCE.height / WINDOW_REFERENCE.width);

    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;

    var scale = 500 / this.canvas.nativeElement.width;
    scale = width / WINDOW_REFERENCE.width;
    this.stage.scaleX = this.stage.scaleY = scale;

    this.stage.regX = -WINDOW_REFERENCE.width / 2;
    this.stage.regY = -WINDOW_REFERENCE.height;
  }
}
