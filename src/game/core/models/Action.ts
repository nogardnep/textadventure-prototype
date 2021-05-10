import { Paragraph } from './Paragraph';
import { GameController } from 'src/game/core/GameController';
import { TextManager } from '../TextManager';
import { Entity } from './Entity';
import { Play } from './Play';
import { TextWrapper } from './Text';

// TODO: good?
type Pattern = string | (new () => Entity)[];

export type ActionReport = {
  success: boolean;
  message?: string;
};

export abstract class Action {
  patterns: { [languageKey: string]: Pattern[] };

  constructor() {}

  getDuration(): number {
    return 1;
  }

  getPlay(): Play {
    return GameController.getPlay();
  }

  getText(): TextWrapper {
    return { fr: 'Action' };
  }

  // TODO
  checkIfMatch(command: Pattern): boolean {
    const patterns = this.patterns[TextManager.getLanguageKey()];
    let matching = true;

    patterns.forEach((pattern: Pattern) => {
      for (let index = 0; index < pattern.length; index++) {
        const patternPart = pattern[index];
        const commandPart = command[index];

        if (patternPart && commandPart) {
          if (typeof patternPart === 'string') {
            if (patternPart === commandPart) {
              matching = false;
            }
          } else if (typeof patternPart === 'function') {
          }
        }
      }
    });

    if (command[0] === patterns[0]) {
      if (patterns[1]) {
        if (typeof patterns[1] === 'string') {
          if (command[1] === patterns[1]) {
          }
        }
      }
    }

    return matching;
  }

  use(author: Entity, args: any[]): boolean {
    let report = this.proceed(author, args);

    if (this.check(author, args, false)) {
      if (author.isThePlayer()) {
        this.report(report, author, args);
        this.onEnded(report.success, author, args);
      }
    }

    return report.success;
  }

  protected proceed(author: Entity, args: any[]): ActionReport {
    return { success: true };
  }

  protected report(report: ActionReport, author: Entity, args: any[]) {
    console.log(report);
  }

  check(
    author: Entity,
    args: any[],
    silently: boolean
  ): {
    usable: boolean;
    failureMessage?: string;
  } {
    return {
      usable: false,
      failureMessage: null,
    };
  }

  protected onEnded(withSuccess: boolean, author: Entity, args: any[]): void {
    if (withSuccess) {
      this.getPlay().increaseTime(this.getDuration());
    }
  }
}
