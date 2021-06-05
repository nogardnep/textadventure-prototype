import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter, DescriptorId, Scenario } from 'src/game/modules/story/main';
import { EditorService } from './../../../services/editor.service';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {
  private routeSubscription: Subscription;
  private scenarioSubscription: Subscription;
  chapter: Chapter;
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
      this.chapter = this.editorService.getChapter(this.id);
    }
  }
}
