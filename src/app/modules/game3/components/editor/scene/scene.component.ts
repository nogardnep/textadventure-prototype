import { Component, Input } from '@angular/core';
import { Scene } from 'src/game/modules/story/main';
import { EditorService } from './../../../services/editor.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent {
  @Input() scene: Scene;

  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  onClickRemove(): void {
    const chapter = this.editorService.getChapter(this.scene.chapterId)

    if (this.scene.id === chapter.firstSceneId) {
      alert('You cannot delete the first scene of a chapter');
    } else if (Object.keys(chapter.scenes).length === 1) {
      alert('A chapter needs at least one scene');
    } else {
      this.editorService.askForConfimation(() => {
        this.editorService.removeScene(this.scene);
      });
    }

    this.editorService.save();
  }

  onClickAddSnippet(): void {
    this.editorService.createSnippet(this.scene);
    this.editorService.save();
  }
}
