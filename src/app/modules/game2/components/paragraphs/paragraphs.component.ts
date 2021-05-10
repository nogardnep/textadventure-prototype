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

  constructor(private gameService:GameService) {}

  ngOnInit() {}

  onClickItem(entity: Entity): void {
    this.gameService.setSelection(entity)
  }
}
