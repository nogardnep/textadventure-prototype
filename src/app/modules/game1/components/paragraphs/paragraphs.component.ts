import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss'],
})
export class ParagraphsComponent implements OnInit {
  @Input() paragraphs: Paragraph[];
  @Output() itemClicked =new EventEmitter<Entity>();

  constructor() {}

  ngOnInit() {}

  onClickItem(entity: Entity): void {
    this.itemClicked.emit(entity)
  }
}
