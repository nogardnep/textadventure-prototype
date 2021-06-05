import { ActivatedRoute } from '@angular/router';
import { EditorService } from './../../../services/editor.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  DescriptorId,
  Scenario,
  UsuableObject,
} from 'src/game/modules/story/main';

@Component({
  selector: 'app-object-page',
  templateUrl: './object.page.html',
  styleUrls: ['./object.page.scss'],
})
export class ObjectPage implements OnInit {
  private routeSubscription: Subscription;
  private scenarioSubscription: Subscription;
  object: UsuableObject;
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
      this.object = this.editorService.getObject(this.id);
    }
  }
}
