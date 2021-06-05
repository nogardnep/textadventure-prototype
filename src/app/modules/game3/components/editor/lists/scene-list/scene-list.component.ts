import { EditorInterfaceService } from './../../../../services/editor-interface.service';
import { EditorService } from './../../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chapter, EntityDescriptor, Scene } from 'src/game/modules/story/main';

@Component({
  selector: 'app-scene-list',
  templateUrl: './scene-list.component.html',
  styleUrls: ['./scene-list.component.scss'],
})
export class SceneListComponent implements OnInit {
  @Input() chapter: Chapter;
  @Input() selected: EntityDescriptor
  language: string;

  constructor(
    private editorService: EditorService,
    private editorInterfaceService: EditorInterfaceService
  ) {
    this.language = this.editorService.getLanguage();
  }

  ngOnInit() {}

  onClickItem(item: Scene): void {
    this.editorInterfaceService.goToScene(item.id);
  }

  onClickAdd(): void {
    this.editorService.createScene(this.chapter);
  }
}
