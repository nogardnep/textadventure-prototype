import { Component, Input, OnInit } from '@angular/core';
import { Play } from 'src/game/core/models/Play';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  @Input() play: Play;

  constructor() {}

  ngOnInit() {}

  print(): string {
    return new Intl.DateTimeFormat('fr', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(this.play.getDate());
  }
}
