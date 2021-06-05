import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import {
  Chapter,
  Character,
  EntityDescriptor,
  Scenario,
  Scene,
  Snippet,
  UsuableObject,
} from 'src/game/modules/story/main';
import { EditorService } from './../../../services/editor.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() scenario: Scenario;
  @Input() selected: EntityDescriptor;
  language: string;
  baseUrl = '/game3/editor';

  constructor(
    private editorService: EditorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.language = this.editorService.getLanguage();
  }

  ngOnInit() {}

  onClickChapter(chapter: Chapter): void {
    this.router.navigate([this.baseUrl + '/chapter', chapter.id]);
  }

  onClickScene(scene: Scene): void {
    this.router.navigate([this.baseUrl + '/scene', scene.id]);
  }

  onClickObject(object: UsuableObject): void {
    this.router.navigate([this.baseUrl + '/object', object.id]);
  }

  onClickCharacter(character: Character): void {
    this.router.navigate([this.baseUrl + '/character', character.id]);
  }

  onClickAddCharacter(): void {
    const character = this.editorService.createChapter(this.scenario);

    this.router.navigate([this.baseUrl + '/character', character.id]);
  }

  onClickAddObject(): void {
    const object = this.editorService.createObject(this.scenario);

    this.router.navigate([this.baseUrl + '/object', object.id]);
  }

  onClickAddChapter(): void {
    const chapter = this.editorService.createChapter(this.scenario);

    this.router.navigate([this.baseUrl + '/chapter', chapter.id]);
  }

  onClickAddScene(chapter: Chapter): void {
    const scene = this.editorService.createScene(chapter);

    this.router.navigate([this.baseUrl + '/scene', scene.id]);
  }

  onClickAddSnippet(scene: Scene): void {
    const snippet = this.editorService.createSnippet(scene);
  }
}
