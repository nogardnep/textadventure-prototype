import { Pipe, PipeTransform } from '@angular/core';
import { TextManager } from 'src/game/Printer';
import { TextWrapper } from './../../game/models/Text';

@Pipe({ name: 'text' })
export class TextPipe implements PipeTransform {
  constructor() {}

  transform(text: TextWrapper): string {
    return TextManager.printText(text);
  }
}
