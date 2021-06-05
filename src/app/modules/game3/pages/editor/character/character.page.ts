import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, DescriptorId, Scenario } from 'src/game/modules/story/main';
import { EditorService } from './../../../services/editor.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  private routeSubscription: Subscription;
  private scenarioSubscription: Subscription;
  character: Character;
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
      this.character = this.editorService.getCharacter(this.id);
    }
  }
}
