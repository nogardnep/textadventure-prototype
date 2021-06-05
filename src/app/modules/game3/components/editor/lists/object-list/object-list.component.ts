import { EditorService } from './../../../../services/editor.service';
import { Component, OnInit, Input } from '@angular/core';
import { EntityDescriptor, Scenario, UsuableObject } from 'src/game/modules/story/main';
import { EditorInterfaceService } from 'src/app/modules/game3/services/editor-interface.service';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss'],
})
export class ObjectListComponent implements OnInit {
  @Input() scenario: Scenario;
  @Input() selected: EntityDescriptor
  language: string;

  constructor(
    private editorService: EditorService,
    private editorInterfaceService: EditorInterfaceService
  ) {
    this.language = this.editorService.getLanguage();
  }

  ngOnInit() {}

  onClickItem(item: UsuableObject): void {
    this.editorInterfaceService.goToObject(item.id);
  }

  onClickAdd(): void {
    this.editorService.createObject(this.scenario);
  }
}
