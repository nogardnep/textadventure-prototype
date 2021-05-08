import { GameController } from '../GameController';
import { TextManager } from '../TextManager';
import { Character } from './entities/material/Character';
import { Entity } from './Entity';
import { Play } from './Play';
import { TextWrapper } from './Text';

// TODO: good?
type Pattern = string | (new () => Entity)[];

export abstract class Action {
  patterns: { [languageKey: string]: Pattern[] };

  getDuraction(): number {
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

  try(author: Character, args: any[]): boolean {
    let success = false;

    if (this.check(author, args, false)) {
      console.log(5);
      success = this.execute(author, args);
    }

    return success;
  }

  execute(author: Character, args: any[]): boolean {
    let success = false;
    let response = this.proceed(author, args);

    if (response === undefined || response) {
      success = true;
    }

    this.onEnded(success);

    return success;
  }

  proceed(author: Character, args: any[]) {}

  check(
    author: Character,
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

  protected onEnded(withSuccess: boolean): void {
    if (withSuccess) {
      this.getPlay().increaseTime(this.getDuraction());
    }
  }
}
