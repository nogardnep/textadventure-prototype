import { GameService } from 'src/app/services/game.service';
import { TextManager } from 'src/game/TextManager';
import { languageKeys } from './../../game/enums/Language';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Utils } from 'src/game/Utils';

export type ConfigData = {
  audio: {
    volume: number;
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

  constructor(private storageService: StorageService) {
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
        volume: 0.5,
      },
      language: languageKeys.fr,
    };
  }
}
