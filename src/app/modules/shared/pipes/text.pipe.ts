import { Pipe, PipeTransform } from '@angular/core';
import { TextManager, TextWrapper } from 'src/game/core/TextManager';

@Pipe({ name: 'text', pure: true })
export class TextPipe implements PipeTransform {
  constructor() {}

  transform(text: TextWrapper): string {
    return TextManager.printText(text);
  }
}
