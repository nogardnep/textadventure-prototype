import { GameController } from 'src/game/GameController';
import { TextWrapper } from 'src/game/models/Text';
import { Paragraph } from './Paragraph';

type Chapter = {
  title?: TextWrapper;
  sections: Section[];
};

type Section = {
  title?: TextWrapper;
  paragraphs: Paragraph[];
};

export interface StoredNarration {
  chapters: Chapter[];
}

export class Narration implements StoredNarration {
  chapters: Chapter[] = [];

  constructor() {
    this.chapters = [];
  }

  load(storedNarration: StoredNarration): void {
    this.chapters = storedNarration.chapters;
  }

  getStored(): StoredNarration {
    const stored = {};

    Object.getOwnPropertyNames(this).forEach((item) => {
      stored[item] = this[item];
    });

    return stored as StoredNarration;
  }

  addChapter(title?: TextWrapper): Chapter {
    const chapter = {
      title,
      sections: [],
    };

    this.chapters.push(chapter);
    this.save();

    return chapter;
  }

  addSection(section: Section): void {
    let chapter = this.getLastChapter();

    if (!chapter) {
      chapter = this.addChapter();
    }

    chapter.sections.push(section);
    this.save();
  }

  getLastChapter(): Chapter {
    return this.chapters[this.chapters.length - 1];
  }

  save(): void {
    GameController.getStoredPlay().narration = this.getStored();
    GameController.savePlay();
  }
}
