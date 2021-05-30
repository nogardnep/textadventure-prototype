import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetOptionStyle } from '@capacitor/core';
import { Action } from 'src/game/core/models/Action';
import { ParagraphItem } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-paragraph-item',
  templateUrl: './paragraph-item.component.html',
  styleUrls: ['./paragraph-item.component.scss'],
})
export class ParagraphItemComponent {
  @Input() item: ParagraphItem;
  @Input() clickable: boolean = true;
  actionsShown = false;

  constructor() {}

  onClick(): void {
    this.actionsShown = !this.actionsShown;
  }
}
