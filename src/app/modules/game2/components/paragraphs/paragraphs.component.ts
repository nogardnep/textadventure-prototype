import { InterfaceService } from 'src/app/services/interface.service';
import { GameService } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';
import { Component, Input, OnInit } from '@angular/core';
import { Paragraph } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'entity-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss'],
})
export class ParagraphsComponent implements OnInit {
  @Input() paragraphs: Paragraph[];

  constructor(private interfaceService:InterfaceService) {}

  ngOnInit() {}

  onClickItem(entity: Entity): void {
    this.interfaceService.setSelection(entity)
  }
}
