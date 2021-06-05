import { EditorService } from './../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import { EntityDescriptor } from 'src/game/modules/story/main';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  @Input() model: EntityDescriptor;

  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  onClickAdd(): void {
    this.model.data.push(this.editorService.createData());
    this.editorService.save();
  }
}
