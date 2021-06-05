import { EditorService } from './../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import { Action, ActionType, Choice } from 'src/game/modules/story/main';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input() choice: Choice;
  @Input() action: Action;
  types = Object.keys(ActionType)

  constructor(private editorService:EditorService) {}

  ngOnInit() {}

  onClickRemove(): void {
    this.choice.actions.forEach((item, index) => {
      if (item === this.action) {
        this.choice.actions.splice(index, 1);
      }
    });

    this.editorService.save();
  }
}
