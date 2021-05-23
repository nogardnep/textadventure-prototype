import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/services/interface.service';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-paragraphs',
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
