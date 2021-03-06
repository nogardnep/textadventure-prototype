import { Injectable } from '@angular/core';
import { Audio, AudioId } from 'src/game/core/models/Audio';
import { Utils } from 'src/game/core/Utils';
import * as Tone from 'tone';

export enum AudioChannelKey {
  Music = 'music',
  Interface = 'interface',
  Effects = 'effects',
}

export enum AudioLayerKey {
  Music = 'music',
  Interface = 'interface',
  BriefEffects = 'briefEffects',
  LocationAmbiance = 'locationAmbiance',
}

export const AUDIO_CHANNEL_NAMES: {
  [key in AudioChannelKey]: string;
} = {
  music: 'musique',
  effects: 'effets',
  interface: 'interface',
};

type SoundWrapper = {
  id: string;
  player: Tone.Player;
};

type AudioChannel = {
  toneChannel: Tone.Channel;
  toneGain: Tone.Gain;
  volume: number;
};

type AudioLayer = {
  channel: AudioChannel;
  sounds: SoundWrapper[];
};

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly baseUrl = 'assets';
  private layers: { [key in AudioLayerKey]?: AudioLayer } = {};
  private channels: { [key in AudioChannelKey]?: AudioChannel } = {};
  private audioWrappers: {
    [key: string]: { audio: Audio; buffer: Tone.ToneAudioBuffer };
  } = {};

  constructor() {
    for (let key in AudioChannelKey) {
      this.addChannel(AudioChannelKey[key]);
    }

    this.addLayer(AudioLayerKey.Music, AudioChannelKey.Music);
    this.addLayer(AudioLayerKey.Interface, AudioChannelKey.Interface);
    this.addLayer(AudioLayerKey.BriefEffects, AudioChannelKey.Effects);
    this.addLayer(AudioLayerKey.LocationAmbiance, AudioChannelKey.Effects);

    document.addEventListener('click', this.initAudio);
  }

  load(audios: { [key: string]: Audio }, onLoadedAll: () => void): void {
    audios = Object.assign({}, audios);
    const size = Utils.getObjectSize(audios);

    if (size > 0) {
      const audio = Utils.getFirstFromObject(audios);
      const buffer = new Tone.ToneAudioBuffer({
        url: this.baseUrl + '/' + audio.source,
        onload: () => {
          this.audioWrappers[audio.getId()] = {
            audio,
            buffer,
          };
          this.loadNext(audios, onLoadedAll);
        },
        onerror: () => {
          this.loadNext(audios, onLoadedAll);
        },
      });
    } else {
      onLoadedAll();
    }
  }

  private loadNext(audios: { [key: string]: Audio }, onLoadedAll: () => void) {
    delete audios[Object.keys(audios)[0]];
    this.load(audios, onLoadedAll);
  }

  stopAllSounds(): void {
    for (let key in this.layers) {
      this.clearLayer(key as AudioLayerKey);
    }
  }

  setMuted(muted: boolean): void {
    for (let key in this.channels) {
      this.channels[key].toneChannel.mute = muted;
    }
  }

  changeChannelVolume(channelKey: AudioChannelKey, volume: number): void {
    const channel = this.channels[channelKey];
    channel.volume = volume;
    channel.toneGain.gain.rampTo(volume, 0.01);
  }

  clearLayer(layerKey: AudioLayerKey): void {
    const channel = this.layers[layerKey];

    this.layers[layerKey].sounds.forEach((item) => {
      item.player.stop();
    });
  }

  play(
    audio: Audio,
    layerKey: AudioLayerKey,
    params?: {
      loop?: boolean;
      fadeIn?: number;
      fadeOut?: number;
      volume?: number;
    }
  ): void {
    const audioWrapper = this.audioWrappers[audio.getId()];

    if (audioWrapper) {
      const layer = this.layers[layerKey];
      const soundId = Utils.generateId();
      const player = new Tone.Player({
        volume: this.convertToDecibels(
          audio.volume * (params && params.volume ? params.volume : 1)
        ),
        loop: params && params.loop ? params.loop : false,
        autostart: true,
        onstop: () => {
          this.remove(soundId, layerKey);
        },
      }).connect(layer.channel.toneChannel);

      if (params && params.fadeIn) {
        player.fadeIn = params.fadeIn / 1000;
      }

      if (params && params.fadeOut) {
        player.fadeOut = params.fadeOut / 1000;
      }

      player.buffer = audioWrapper.buffer;
      player.start();
      this.layers[layerKey].sounds.push({ id: soundId, player });
    } else {
      console.error('Unfound audio buffer', audio);
    }
  }

  private remove(id: string, layerKey: AudioLayerKey): void {
    this.layers[layerKey].sounds.forEach((item, index) => {
      if (item.id === id) {
        this.layers[layerKey].sounds.splice(index, 1);
      }
    });
  }

  private addLayer(layerKey: AudioLayerKey, channelKey: AudioChannelKey): void {
    this.layers[layerKey] = {
      channel: this.channels[channelKey],
      sounds: [],
    };
  }

  private addChannel(channelKey: AudioChannelKey): void {
    const toneChannel = new Tone.Channel();
    const toneGain = new Tone.Gain(1).toDestination();
    toneChannel.connect(toneGain);

    this.channels[channelKey] = {
      toneChannel,
      volume: 1,
      toneGain,
    };
  }

  private initAudio = () => {
    Tone.start();
    document.removeEventListener('click', this.initAudio);
  };

  private convertToDecibels(rate: number): number {
    return 20 * Math.log(rate);
  }

  private convertToRate(decibels: number): number {
    return Math.exp(decibels / 20);
  }
}
