import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.storage.create().then(() => {});
  }

  public set(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  public async remove(key: string): Promise<any> {
    return await this.storage.remove(key);
  }

  public clear() {
    this.storage.clear()
  }
}
