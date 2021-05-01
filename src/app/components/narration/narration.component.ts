import { Narration, StoredNarration } from './../../../game/models/Narration';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['./narration.component.scss'],
})
export class NarrationComponent implements OnInit {
  @Input() narration: StoredNarration;

  constructor() {}

  ngOnInit() {
  }
}
