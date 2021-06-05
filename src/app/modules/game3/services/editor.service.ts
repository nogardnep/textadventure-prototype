import { StorageService } from './../../../services/storage.service';
import { Injectable } from '@angular/core';
import { config, Subject } from 'rxjs';
import { Utils } from 'src/game/core/Utils';
import {
  Chapter,
  Character,
  EntityData,
  Scene,
  Snippet,
  Scenario,
  DescriptorId,
  UsuableObject,
} from 'src/game/modules/story/main';

export enum LanguageKey {
  English = 'en',
  French = 'fr',
}

const SCENARIO_STORAGE_KEY = 'story_scenario';
const BLANK_TEXT = '...';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private language: LanguageKey = LanguageKey.English;
  private scenario: Scenario;

  scenarioSubject = new Subject<Scenario>();
  languageSubject = new Subject<LanguageKey>();

  constructor(private storageService: StorageService) {}

  checkScenario(): void {
    if (!this.scenario) {
      this.storageService.get(SCENARIO_STORAGE_KEY).then((data) => {
        this.setScenario(data);
      });
    }
  }

  setScenario(scenario: Scenario): void {
    this.scenario = scenario;
    this.emitScenario();
  }

  save(): void {
    this.storageService.set(SCENARIO_STORAGE_KEY, this.scenario);
  }

  getLanguage(): LanguageKey {
    return this.language;
  }

  setLanguage(language: LanguageKey): void {
    this.language = language;
    this.emitLanguage();
  }

  emitLanguage(): void {
    this.languageSubject.next(this.language);
  }

  emitScenario(): void {
    this.scenarioSubject.next(this.scenario);
  }

  askForConfimation(onConfirm: () => void, onCancel?: () => void): void {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      onConfirm();
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  }

  createData(): EntityData {
    return {
      name: '...',
      type: null,
      value: null,
    };
  }

  createScenario(): Scenario {
    const scenario: Scenario = {
      id: Utils.generateId(),
      data: [],
      name: { [this.language]: BLANK_TEXT },
      chapters: [],
      characters: [],
      objects: [],
      firstChapterId: null,
    };

    const chapter = this.createChapter(scenario);
    scenario.firstChapterId = chapter.id;

    this.save();

    return scenario;
  }

  createChapter(scenario: Scenario): Chapter {
    const chapter: Chapter = {
      id: Utils.generateId(),
      data: [],
      name: { [this.language]: BLANK_TEXT },
      scenes: [],
      firstSceneId: null,
      scenarioId: scenario.id,
    };

    if (!scenario.chapters) {
      scenario.chapters = [];
    }

    scenario.chapters.push(chapter);

    const scene = this.createScene(chapter);
    chapter.firstSceneId = scene.id;

    this.save();

    return chapter;
  }

  createObject(scenario: Scenario): UsuableObject {
    const object: UsuableObject = {
      id: Utils.generateId(),
      data: [],
      name: { [this.language]: BLANK_TEXT },
      scenarioId: scenario.id,
    };

    if (!scenario.objects) {
      scenario.objects = [];
    }

    scenario.objects.push(object);

    this.save();

    return object;
  }

  createCharacter(scenario: Scenario): Character {
    const character: Character = {
      id: Utils.generateId(),
      data: [],
      objects: [],
      name: { [this.language]: BLANK_TEXT },
      scenarioId: scenario.id,
    };

    if (!scenario.characters) {
      scenario.characters = [];
    }

    scenario.characters.push(character);

    this.save();

    return character;
  }

  createScene(chapter: Chapter): Scene {
    const scene: Scene = {
      id: Utils.generateId(),
      data: [],
      name: { [this.language]: BLANK_TEXT },
      firstSnippetId: null,
      snippets: [],
      chapterId: chapter.id,
    };

    if (!chapter.scenes) {
      chapter.scenes = [];
    }

    chapter.scenes.push(scene);

    const snippet = this.createSnippet(scene);
    scene.firstSnippetId = snippet.id;

    this.save();

    return scene;
  }

  createSnippet(scene: Scene): Snippet {
    const snippet: Snippet = {
      id: Utils.generateId(),
      data: [],
      name: { [this.language]: BLANK_TEXT },
      choices: [],
      paragraphs: [],
      sceneId: scene.id,
    };

    if (!scene.snippets) {
      scene.snippets = [];
    }

    scene.snippets.push(snippet);

    this.save();

    return snippet;
  }

  getScenario(): Scenario {
    return this.scenario;
  }

  getCharacter(id: DescriptorId): Character {
    let found: Character;

    this.scenario.characters.forEach((item) => {
      if (item.id === id) {
        found = item;
      }
    });

    return found;
  }

  getObject(id: DescriptorId): UsuableObject {
    let found: UsuableObject;

    this.scenario.objects.forEach((item) => {
      if (item.id === id) {
        found = item;
      }
    });

    return found;
  }

  getChapter(id: DescriptorId): Chapter {
    let found: Chapter;

    this.scenario.chapters.forEach((item) => {
      if (item.id === id) {
        found = item;
      }
    });

    return found;
  }

  getScene(id: DescriptorId): Scene {
    let found: Scene;

    this.scenario.chapters.forEach((chapter) => {
      chapter.scenes.forEach((scene) => {
        if (scene.id === id) {
          found = scene;
        }
      });
    });

    return found;
  }

  getSnippet(id: DescriptorId): Snippet {
    let found: Snippet;

    this.scenario.chapters.forEach((chapter) => {
      chapter.scenes.forEach((scene) => {
        scene.snippets.forEach((item) => {
          if (item.id === id) {
            found = item;
          }
        });
      });
    });

    return found;
  }

  removeObject(object: UsuableObject): void {
    this.scenario.objects.forEach((item, index) => {
      if (item.id === object.id) {
        this.scenario.objects.splice(index, 1);
      }
    });
  }

  removeCharacter(character: Character): void {
    this.scenario.characters.forEach((item, index) => {
      if (item.id === character.id) {
        this.scenario.characters.splice(index, 1);
      }
    });
  }

  removeChapter(chapter: Chapter): void {
    this.scenario.chapters.forEach((item, index) => {
      if (item.id === chapter.id) {
        this.scenario.chapters.splice(index, 1);
      }
    });
  }

  removeScene(scene: Scene): void {
    const chapter = this.getChapter(scene.chapterId);

    chapter.scenes.forEach((item, index) => {
      if (item.id === scene.id) {
        chapter.scenes.splice(index, 1);
      }
    });
  }

  removeSnippet(snippet: Snippet): void {
    const scene = this.getScene(snippet.sceneId);

    scene.snippets.forEach((item, index) => {
      if (item.id === snippet.id) {
        scene.snippets.splice(index, 1);
      }
    });
  }
}
