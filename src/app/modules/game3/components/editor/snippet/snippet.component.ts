import { EditorService } from './../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActionType, Scene, Snippet } from 'src/game/modules/story/main';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
})
export class SnippetComponent implements OnInit {
  @Input() snippet: Snippet;

  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  onClickRemove(): void {
    const scene = this.editorService.getScene(this.snippet.sceneId);

    if (this.snippet.id === scene.firstSnippetId) {
      alert('You cannot delete the first snippet of a scene');
    } else if (Object.keys(scene.snippets).length === 1) {
      alert('A scene needs at least one snippet');
    } else {
      this.editorService.askForConfimation(() => {
        this.editorService.removeSnippet(this.snippet);
      });
    }

    this.editorService.save();
  }

  onClickAddChoice(): void {
    this.snippet.choices.push({
      actions: [],
      conditions: [],
      text: { en: '...' },
    });

    this.editorService.save();
  }
}
