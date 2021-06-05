import { EditorService } from './../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  EntityDescriptor,
  EntityData,
  EntityDataType,
} from 'src/game/modules/story/main';
import { Utils } from 'src/game/core/Utils';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  @Input() model: EntityDescriptor;
  @Input() data: EntityData;
  types = EntityDataType;
  id = Utils.generateId();

  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  onValueChange(): void {
    this.editorService.save();
  }

  onTypeChange(): void {
    this.onValueChange();
    this.data.value = null;
  }
}
