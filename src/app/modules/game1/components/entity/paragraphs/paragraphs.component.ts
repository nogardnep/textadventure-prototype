import { Component, Input, OnInit } from '@angular/core';
import { Paragraph } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'entity-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss'],
})
export class ParagraphsComponent implements OnInit {
  @Input() paragraphs: Paragraph[];

  constructor() {}

  ngOnInit() {}
}
