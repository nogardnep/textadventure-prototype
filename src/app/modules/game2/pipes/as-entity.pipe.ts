import { Pipe, PipeTransform } from '@angular/core';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

@Pipe({ name: 'asEntity', pure: true })
export class asEntity implements PipeTransform {
  constructor() {}

  transform(item: any): BaseEntity {
    return item as BaseEntity;
  }
}
