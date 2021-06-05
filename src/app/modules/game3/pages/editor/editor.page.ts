import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { EntityDescriptor, Scenario } from 'src/game/modules/story/main';
import { EditorService } from './../../services/editor.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage {
  @Input() selected: EntityDescriptor;
  scenario: Scenario;
  private scenarioSubscription: Subscription;

  constructor(private editorService: EditorService) {
    this.editorService.checkScenario();
  }

  ngOnInit() {
    this.scenarioSubscription = this.editorService.scenarioSubject.subscribe(
      (scenario) => {
        this.scenario = scenario;
      }
    );

    this.editorService.emitScenario();
  }

  ngOnDestroy() {
    this.scenarioSubscription.unsubscribe();
  }

  onClickSave() {
    this.editorService.save();
  }

  onClickNew() {
    this.scenario = this.editorService.createScenario();
    this.editorService.setScenario(this.scenario);
    this.editorService.save();
  }
}
