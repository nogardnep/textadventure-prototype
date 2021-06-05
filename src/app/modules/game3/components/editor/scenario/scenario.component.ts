import { Component, Input } from '@angular/core';
import { Scenario } from 'src/game/modules/story/main';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
})
export class ScenarioComponent {
  @Input() scenario: Scenario;

  constructor(private editorService: EditorService) {}

  onClickAddChapter(): void {
    this.editorService.createChapter(this.scenario);
    this.editorService.save();
  }

  onClickAddCharacter(): void {
    this.editorService.createCharacter(this.scenario);
    this.editorService.save();
  }

  onClickAddObject(): void {
    this.editorService.createObject(this.scenario);
    this.editorService.save();
  }
}
