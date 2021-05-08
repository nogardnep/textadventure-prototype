import { Pipe, PipeTransform } from '@angular/core';
import { NameWrapper } from 'src/game/core/models/Text';
import { TextManager } from 'src/game/core/TextManager';

@Pipe({ name: 'name' })
export class NamePipe implements PipeTransform {
  constructor() {}

  transform(nameWrapper: NameWrapper): string {
    return TextManager.extractName(nameWrapper).printSimple();
  }
}
