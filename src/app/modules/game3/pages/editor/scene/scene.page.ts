import { ActivatedRoute } from '@angular/router';
import { EditorService } from './../../../services/editor.service';
import { DescriptorId, Scene, Scenario } from 'src/game/modules/story/main';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scene-page',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss'],
})
export class ScenePage implements OnInit {
  private routeSubscription: Subscription;
  private scenarioSubscription: Subscription;
  scene: Scene;
  scenario: Scenario;
  private id: DescriptorId;

  constructor(
    private editorService: EditorService,
    private route: ActivatedRoute
  ) {
    this.editorService.checkScenario();
  }

  ngOnInit() {
    this.scenarioSubscription = this.editorService.scenarioSubject.subscribe(
      (scenario) => {
        this.scenario = scenario;
        this.update();
      }
    );

    this.editorService.emitScenario();

    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.update();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.scenarioSubscription.unsubscribe();
  }

  update() {
    if (this.scenario && this.id) {
      this.scene = this.editorService.getScene(this.id);
    }
  }
}
