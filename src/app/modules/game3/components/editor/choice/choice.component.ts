import { EditorService } from './../../../services/editor.service';
import { Component, Input } from '@angular/core';
import { Utils } from 'src/game/core/Utils';
import { Choice, Snippet } from 'src/game/modules/story/main';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent {
  @Input() snippet: Snippet;
  @Input() choice: Choice;
  id = Utils.generateId();

  constructor(private editorService: EditorService) {}

  onClickAddCondition(): void {
    this.choice.conditions.push({
      entityType: null,
      destination: null,
      subject: null,
      type: null,
      contrary: false,
    });

    this.editorService.save();
  }

  onClickAddAction(): void {
    this.choice.actions.push({
      destination: null,
      subject: null,
      type: null,
    });

    this.editorService.save();
  }

  onClickRemove(): void {
    this.editorService.askForConfimation(() => {
      this.snippet.choices.forEach((item, index) => {
        if (item === this.choice) {
          this.snippet.choices.splice(index, 1);
        }
      });

      this.editorService.save();
    });
  }
}
