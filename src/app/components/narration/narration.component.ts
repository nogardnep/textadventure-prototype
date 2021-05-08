import { Component, Input, OnInit } from '@angular/core';
import { StoredNarration } from 'src/game/core/models/Narration';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['./narration.component.scss'],
})
export class NarrationComponent implements OnInit {
  @Input() narration: StoredNarration;

  constructor() {}

  ngOnInit() {}
}
