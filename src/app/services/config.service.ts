import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Utils } from 'src/game/Utils';

export type ConfigData = {
  audio: {
    volume: number;
  };
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

    const loaded = {
      audio: {
        volume: 8,
        are: 8,
        list: ['c', 'd']
      },
    };

    const base = {
      audio: {
        volume: 5,
        list: ['a', 'b']
      },
    };

    Utils.assignWithModel(base, loaded);

    console.log(base);
  }

  emitData(): void {
    this.dataSubject.next(this.data);
  }

  save(): void {
    this.storageService.set(CONFIG_STORAGE_KEY, this.data);
  }

  load(): void {
    this.storageService.get(CONFIG_STORAGE_KEY).then((result: {}) => {
      this.data = this.getDefault();

      if (result) {
        Utils.assignWithModel(this.data, result);
      }

      this.emitData();
    });
  }

  private getDefault(): ConfigData {
    return {
      audio: {
        volume: 0.5,
      },
    };
  }
}
