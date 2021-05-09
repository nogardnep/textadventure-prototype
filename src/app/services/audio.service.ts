import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Audio } from 'src/game/core/models/Audio';
// import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { Media } from '@ionic-native/media/ngx';

const FADE_DURATION = 1000;

type SoundWrapper = {
  id: number;
  howl: Howl;
  audio: Audio;
  fadingOut: boolean;
};

export enum AudioLayerKey {
  Music = 'music',
  Ambiance = 'ambiance',
  Effects = 'effects',
  Interface = 'interface',
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private layers: {
    [key in AudioLayerKey]: { volume: number; sounds: SoundWrapper[] };
  } = {
    ambiance: {
      volume: 1,
      sounds: [],
    },
    effects: {
      volume: 1,
      sounds: [],
    },
    music: {
      volume: 1,
      sounds: [],
    },
    interface: {
      volume: 1,
      sounds: [],
    },
  };

  constructor() {}

  stopAllSounds() {
    for (let key in this.layers) {
      this.clearLayer(key as AudioLayerKey);
    }
  }

  setMuted(muted: boolean) {
    for (let key in this.layers) {
      this.layers[key].sounds.forEach((item) => {
        item.howl.mute(muted);
      });
    }
  }

  changeLayerVolume(layerKey: AudioLayerKey, volume: number): void {
    const layer = this.layers[layerKey];
    layer.volume = volume;
    layer.sounds.forEach((item) => {
      item.howl.volume(item.audio.volume * volume);
    });
  }

  clearLayer(layerKey: AudioLayerKey): void {
    this.layers[layerKey].sounds.forEach((item) => {
      if (!item.fadingOut) {
        item.howl.fade(item.audio.volume, 0, FADE_DURATION);
        item.fadingOut = true;

        setTimeout(() => {
          item.howl.stop();
        }, FADE_DURATION);
      }
    });
  }

  playInLayer(audio: Audio, layerKey: AudioLayerKey, looping: boolean) {
    const howl = new Howl({
      src: ['assets/' + audio.source],
      volume: audio.volume * this.layers[layerKey].volume,
      loop: looping,
    });

    const id = howl.play();
    howl.fade(0, audio.volume, FADE_DURATION);

    this.layers.ambiance.sounds.push({
      id,
      howl,
      audio,
      fadingOut: false,
    });
  }
}
