import { Component, Input, OnInit } from '@angular/core';
import { Character, EntityDescriptor, Scenario } from 'src/game/modules/story/main';
import { EditorInterfaceService } from './../../../../services/editor-interface.service';
import { EditorService } from './../../../../services/editor.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
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

  onClickItem(item:Character): void {
    this.editorInterfaceService.goToCharacter(item.id);
  }

  onClickAdd(): void {
    this.editorService.createCharacter(this.scenario);
  }
}
