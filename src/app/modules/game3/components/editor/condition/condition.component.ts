import {
  EntityDescriptor,
  ConditionType,
  EntityDescriptorType,
} from 'src/game/modules/story/main';
import { EditorService } from './../../../services/editor.service';
import { Component, OnInit, Input } from '@angular/core';
import { Choice, Condition } from 'src/game/modules/story/main';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit {
  @Input() choice: Choice;
  @Input() condition: Condition;
  entityTypes = EntityDescriptorType;
  conditionTypes = ConditionType;
  entityList: EntityDescriptor[] = [];

  constructor(private editorService: EditorService) {
    console.log(this.entityTypes);
  }

  ngOnInit() {}

  onClickRemove(): void {
    this.choice.conditions.forEach((item, index) => {
      if (item === this.condition) {
        this.choice.conditions.splice(index, 1);
      }
    });

    this.editorService.save();
  }

  onEntityTypeChange(): void {
    this.entityList = [];

    switch (this.condition.entityType) {
      case EntityDescriptorType.Character:
        // this.entityList = this.
        break;
    }

    this.onValueChange();
  }

  onValueChange(): void {
    this.editorService.save();
  }
}
