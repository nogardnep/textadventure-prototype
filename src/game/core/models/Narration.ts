import { Paragraph } from './Paragraph';
import { Play } from './Play';

export type Chapter = {
  title?: string;
  sections: Section[];
};

export type Section = {
  title?: string;
  paragraphs: Paragraph[];
  tag?: Tag;
};

export interface StoredNarration {
  chapters: Chapter[];
}

export enum Tag {
  Action = 'action',
  Description = 'description',
  Choice = 'input',
}

export class Narration implements StoredNarration {
  protected getPlay: () => Play;
  chapters: Chapter[] = [];

  constructor(play: Play) {
    this.getPlay = () => {
      return play;
    };
    this.chapters = [];
  }

  load(storedNarration: StoredNarration): void {
    this.chapters = storedNarration.chapters;
  }

  getStored(): StoredNarration {
    const stored = {};

    Object.getOwnPropertyNames(this).forEach((item) => {
      if (typeof this[item] !== 'function') {
        stored[item] = this[item];
      }
    });

    return stored as StoredNarration;
  }

  addChapter(title?: string): Chapter {
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
    // TODO: move
    this.getPlay().storeNarration();
    this.getPlay().save();
  }
}
