import { AfterViewInit, Component, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements AfterViewInit {
  @Input() entity: MaterialEntity;

  constructor(private gameService: GameService) {}

  ngAfterViewInit() {
    var stage = new createjs.Stage('demoCanvas');
    var circle = new createjs.Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;

    var data = {
      images: ['/assets/scenarios/images/diamond-001-sprite.png'],
      frames: { width: 50, height: 50 },
      animations: {
        stand: 0,
        run: [1, 5],
        jump: [6, 8, 'run'],
      },
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, 'run');

    var instance = new createjs.Sprite(spriteSheet);
    instance.gotoAndStop('stand');
    stage.addChild(instance);
    stage.update();

    // let stage = new Konva.Stage({
    //   container: 'container',
    //   width: 300,
    //   height: 300,
    // });

    // var layer = new Konva.Layer();
    // var animations = {
    //   idle: [
    //     // x, y, width, height (4 frames)
    //     2,
    //     2,
    //     70,
    //     119,
    //   ],
    // };

    // var imageObj = new Image();
    // imageObj.onload = function () {
    //   var blob = new Konva.Sprite({
    //     x: 50,
    //     y: 50,
    //     image: imageObj,
    //     animation: 'idle',
    //     animations: animations,
    //     frameRate: 7,
    //     frameIndex: 0,
    //   });

    //   // add the shape to the layer
    //   layer.add(blob);

    //   // add the layer to the stage
    //   stage.add(layer);

    //   // start sprite animation
    //   blob.start();
    // };
    // imageObj.src = '/assets/scenarios/images/diamond-001-sprite.png';
  }
}
