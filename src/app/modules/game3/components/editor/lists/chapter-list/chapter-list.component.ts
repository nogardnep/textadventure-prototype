import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from 'src/app/modules/game3/services/editor.service';
import {
  Chapter,
  EntityDescriptor,
  Scenario
} from 'src/game/modules/story/main';
import { EditorInterfaceService } from './../../../../services/editor-interface.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent implements OnInit {
  @Input() scenario: Scenario;
  @Input() selected: EntityDescriptor;
  language: string;

  constructor(
    private editorService: EditorService,
    private editorInterfaceService: EditorInterfaceService
  ) {
    this.language = this.editorService.getLanguage();
  }

  ngOnInit() {}

  onClickItem(item: Chapter): void {
    this.editorInterfaceService.goToChapter(item.id);
  }

  onClickAdd(): void {
    this.editorService.createChapter(this.scenario);
  }
}
