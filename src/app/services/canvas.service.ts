import { Injectable } from '@angular/core';
import { Image } from 'src/game/core/models/Image';
import { Utils } from 'src/game/core/Utils';
import * as createjs from 'createjs-module';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  imageWrappers: { key: string; image: Image };
  baseUrl: 'assets';

  load(images: { [key: string]: Image }, onLoadedAll: () => void): void {

    let loadQueue;

    loadQueue = new createjs.LoadQueue(true);
    loadQueue.on('fileload', () => {
      console.log('fileload');
    });
    loadQueue.on('complete', () => {
      console.log(loadQueue)
      console.log('complete');
    });
    loadQueue.on('error', () => {
      console.log('error');
    });

    loadQueue.loadManifest([
      {
        src: 'assets/scenarios/images/objects/helmet.png',
        id: 'a',
      },
    ]);
  }
}
