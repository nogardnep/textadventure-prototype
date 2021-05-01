import { NameWrapper } from './../../game/models/Text';
import { Pipe, PipeTransform } from '@angular/core';
import { TextManager } from 'src/game/TextManager';

@Pipe({ name: 'name' })
export class NamePipe implements PipeTransform {
  constructor() {}

  transform(nameWrapper: NameWrapper): string {
    return TextManager.getName(nameWrapper).printSimple();
  }
}
