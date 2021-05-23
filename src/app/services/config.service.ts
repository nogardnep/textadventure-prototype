import { AudioChannelKey, AudioService } from './audio.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LanguageKey } from 'src/game/core/dictionnaries/Language';
import { TextManager } from 'src/game/core/TextManager';
import { Utils } from 'src/game/core/Utils';
import { StorageService } from './storage.service';

export type ConfigData = {
  audio: {
    muted: boolean;
    volumes: { [key in AudioChannelKey]: number };
  };
  language: string;
};

const CONFIG_STORAGE_KEY = 'config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private data: ConfigData;

  dataSubject = new Subject<ConfigData>();

  constructor(
    private storageService: StorageService,
    private audioService: AudioService
  ) {
    this.load();
  }

  emitData(): void {
    this.dataSubject.next(this.data);
  }

  save(): void {
    this.storageService.set(CONFIG_STORAGE_KEY, this.data);
    this.apply();
  }

  apply(): void {
    TextManager.setLanguage(this.data.language);

    for (let key in this.data.audio.volumes) {
      this.audioService.changeChannelVolume(
        key as AudioChannelKey,
        this.data.audio.volumes[key]
      );
    }

    this.audioService.setMuted(this.data.audio.muted);
  }

  load(): void {
    this.storageService.get(CONFIG_STORAGE_KEY).then((result: {}) => {
      this.data = this.getDefault();

      if (result) {
        Utils.assignWithModel(this.data, result);
      }

      this.emitData();
      this.apply();
    });
  }

  getData(): ConfigData {
    return this.data;
  }

  private getDefault(): ConfigData {
    return {
      audio: {
        muted: false,
        volumes: {
          effects: 1,
          music: 1,
          interface: 1,
        },
      },
      language: LanguageKey.French,
    };
  }
}
