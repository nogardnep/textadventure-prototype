import { Action } from 'src/game/core/models/Action';
import { BasePlay } from '../../BasePlay';
import { BaseAction } from '../BaseAction';
import { Character } from '../entities/material/Character';

export class Talking extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'parler';
      },
      patterns: [],
    });
  }

  check(author: Character, args: any[]) {
    let usable = false;
    let failureMessage: string = null;
    let target = args[0] as Character;

    // TODO
    if (!target.isDead()) {
      if (author.canSee(target)) {
        usable = true;
      }
    }

    return {
      usable,
      failureMessage,
    };
  }

  proceed(author: Character, args: any[]) {
    // TODO
    let target = args[0] as Character;

    return target.talkedBy(author);

    // const choices: Choice[] = [];
    // const subjects = target.getKnownSubjects();
    // console.log(subjects)

    // for (let key in subjects) {
    //   choices.push({
    //     proceed: subjects[key].onAsked,
    //     check: subjects[key].check,
    //     text: subjects[key].title,
    //   });
    // }

    // this.getPlay().inform([], choices);
  }
}
