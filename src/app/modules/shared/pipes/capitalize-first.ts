import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizeFirst', pure: true })
export class CapitalizeFirstPipe implements PipeTransform {
  constructor() {}

  transform(text: string): string {
    return text[0].toUpperCase() + text.substr(1);
  }
}
