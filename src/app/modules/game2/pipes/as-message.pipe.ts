import { Pipe, PipeTransform } from '@angular/core';
import { Message } from 'src/game/core/models/Message';

@Pipe({ name: 'asMessage', pure: true })
export class AsMessage implements PipeTransform {
  constructor() {}

  transform(item: any): Message {
    return item as Message;
  }
}
