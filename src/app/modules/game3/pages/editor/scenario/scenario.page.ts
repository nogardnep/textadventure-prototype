import { EditorService } from './../../../services/editor.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Scenario } from 'src/game/modules/story/main';

@Component({
  selector: 'app-scenario-page',
  templateUrl: './scenario.page.html',
  styleUrls: ['./scenario.page.scss'],
})
export class ScenarioPage implements OnInit {
  private scenarioSubscription: Subscription;
  scenario: Scenario;

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
}
