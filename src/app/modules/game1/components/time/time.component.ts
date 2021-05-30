import { Component, Input } from '@angular/core';
import { Play } from 'src/game/core/models/Play';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent {
  @Input() play: Play;
  printed: string;

  constructor() {}

  ngOnChanges() {
    this.update();
  }

  private update(): void {
    if (this.play) {
      this.printed = new Intl.DateTimeFormat('fr', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(this.play.getDate());
    }
  }
}
