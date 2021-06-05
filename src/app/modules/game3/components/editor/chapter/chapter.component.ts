import { Component, Input } from '@angular/core';
import { Chapter } from 'src/game/modules/story/main';
import { EditorService } from './../../../services/editor.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent {
  @Input() chapter: Chapter;

  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  onClickRemove(): void {
    const scenario = this.editorService.getScenario();

    if (this.chapter.id === scenario.firstChapterId) {
      alert('You cannot delete the first chapter of a story');
    } else if (Object.keys(scenario.chapters).length === 1) {
      alert('A story needs at least one chapter');
    } else {
      this.editorService.askForConfimation(() => {
        this.editorService.removeChapter(this.chapter);
      });
    }

    this.editorService.save();
  }

  onValueChange(): void {
    this.editorService.save();
  }
}
