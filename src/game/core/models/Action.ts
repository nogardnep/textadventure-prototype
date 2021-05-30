import { Entity } from './Entity';
import { ParagraphTag } from './Paragraph';
import { Play } from './Play';

export type ActionReport = {
  success: boolean;
  message?: string;
};

export type ActionThing = {
  label: string;
  item: any;
};

// TODO: good?
// type Pattern = (string | (new () => Entity))[];

export type ActionPattern = {
  checkType: (arg: any) => boolean;
  getUsableThings: (author: Entity) => ActionThing[];
  getSearchText: () => string;
  getEmptyText: () => string;
};

// export type ActionPattern = {
//   regExp: RegExp;
// };

export type ActionContructor = new (play: Play) => Action;

export type ActionsParams = {
  text: () => string;
  patterns: ActionPattern[];
};

export abstract class Action {
  private patterns: ActionPattern[];
  private onGetText: () => string;
  private onGetPlay: () => Play;

  constructor(play: Play, params: ActionsParams) {
    this.onGetPlay = () => {
      return play;
    };

    this.patterns = params.patterns;
    this.onGetText = params.text;
  }

  // TODO: to be continued
  try(author: Entity, givenArgs: any[]) {
    let error = false;
    const missingArgsIndex: number[] = [];

    this.patterns.forEach((pattern, index) => {
      const arg = givenArgs[index];

      if (arg === undefined) {
        missingArgsIndex.push(index);
      } else if (!pattern.checkType(arg)) {
        console.error(
          'Argument at index ' +
            index +
            " is not of the good type for '" +
            this.getText() +
            "' action."
        );

        error = true;
      }
    });

    if (!error) {
      this.searchAndUse(author, Array.from(givenArgs), missingArgsIndex, 0);
    }
  }

  private searchAndUse(
    author: Entity,
    args: any[],
    missingArgsIndex: number[],
    currentIndex: number
  ) {
    if (currentIndex >= missingArgsIndex.length) {
      this.use(author, args);
    } else {
      const argIndex = missingArgsIndex[currentIndex];

      this.getPlay()
        .getOutputs()
        .onSearchingForActionArg(author, this.patterns[argIndex])
        .then((value) => {
          args[argIndex] = value;

          this.searchAndUse(author, args, missingArgsIndex, currentIndex + 1);
        })
        .catch(() => {});
    }
  }

  getDuration(): number {
    return 1;
  }

  getText(): string {
    return this.onGetText();
  }

  getPlay(): Play {
    return this.onGetPlay();
  }

  use(author: Entity, args: any[]): boolean {
    let success = false;

    if (this.check(author, args, false)) {
      let report = this.proceed(author, args);
      success = report.success;

      if (author.isThePlayer()) {
        this.report(report, author, args);
        this.onEnded(report.success, author, args);
      }
    }

    return success;
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

  protected proceed(author: Entity, args: Entity[]): ActionReport {
    return { success: true };
  }

  protected report(report: ActionReport, author: Entity, args: any[]) {
    if (author.isThePlayer() && report.message) {
      author.getPlay().sendMessage({
        paragraphs: [
          {
            text: report.message,
            tag: report.success
              ? ParagraphTag.ActionSuccess
              : ParagraphTag.ActionFailure,
          },
        ],
      });
    }
  }

  protected onEnded(
    withSuccess: boolean,
    author: Entity,
    args: Entity[]
  ): void {
    if (withSuccess) {
      author.getPlay().increaseTime(this.getDuration());
    }
  }

  // TODO
  // checkIfMatch(command: Pattern): boolean {
  //   let matching = true;
  //   // const patterns = this.patterns[TextManager.getLanguageKey()];

  //   // patterns.forEach((pattern: Pattern) => {
  //   //   for (let index = 0; index < pattern.length; index++) {
  //   //     const patternPart = pattern[index];
  //   //     const commandPart = command[index];

  //   //     if (patternPart && commandPart) {
  //   //       if (typeof patternPart === 'string') {
  //   //         if (patternPart === commandPart) {
  //   //           matching = false;
  //   //         }
  //   //       } else if (typeof patternPart === 'function') {
  //   //       }
  //   //     }
  //   //   }
  //   // });

  //   // if (command[0] === patterns[0]) {
  //   //   if (patterns[1]) {
  //   //     if (typeof patterns[1] === 'string') {
  //   //       if (command[1] === patterns[1]) {
  //   //       }
  //   //     }
  //   //   }
  //   // }

  //   return matching;
  // }
}
