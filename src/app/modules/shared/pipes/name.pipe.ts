import { Pipe, PipeTransform } from '@angular/core';
import { NameWrapper, TextManager } from 'src/game/core/TextManager';

@Pipe({ name: 'name', pure: true })
export class NamePipe implements PipeTransform {
  constructor() {}

  transform(nameWrapper: NameWrapper): string {
    return TextManager.extractName(nameWrapper).printSimple();
  }
}
