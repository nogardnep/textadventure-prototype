import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kebabCase', pure: true })
export class KebabCasePipe implements PipeTransform {
  constructor() {}

  transform(text: string): string {
    return text.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }
}
