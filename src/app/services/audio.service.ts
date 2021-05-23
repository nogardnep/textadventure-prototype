import { Injectable } from '@angular/core';
import { Audio } from 'src/game/core/models/Audio';
import { Utils } from 'src/game/core/Utils';
import * as Tone from 'tone';

const FADE_DURATION = 1000;

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
  private layers: { [key: string]: AudioLayer };
  private channels: { [key: string]: AudioChannel };

  constructor() {
    this.channels = {};
    this.layers = {};

    for (let key in AudioChannelKey) {
      this.addChannel(AudioChannelKey[key]);
    }

    this.addLayer(AudioLayerKey.Music, AudioChannelKey.Music);
    this.addLayer(AudioLayerKey.Interface, AudioChannelKey.Interface);
    this.addLayer(AudioLayerKey.BriefEffects, AudioChannelKey.Effects);
    this.addLayer(AudioLayerKey.LocationAmbiance, AudioChannelKey.Effects);

    document.addEventListener('click', this.initAudio);
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
    loop: boolean,
    fade = false
  ): void {
    const layer = this.layers[layerKey];
    const id = Utils.generateId();

    const player = new Tone.Player({
      url: 'assets/' + audio.source,
      volume: this.convertToDecibels(audio.volume),
      loop,
      autostart: true,
      onload: () => {},
      onstop: () => {
        this.remove(id, layerKey);
      },
    }).connect(layer.channel.toneChannel);

    if (fade) {
      player.fadeIn = FADE_DURATION / 1000;
      player.fadeOut = FADE_DURATION / 1000;
    }

    this.layers[layerKey].sounds.push({ id, player });
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
