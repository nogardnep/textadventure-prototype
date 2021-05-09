import { Scenario, Scenarios } from './models/Scenario';
import { Choice } from './models/Choice';
import { Paragraph } from './models/Paragraph';
import { Play, StoredPlay } from './models/Play';
import { TextWrapper } from './models/Text';

type Callbacks = {
  onInform: (paragraphs: Paragraph[], actions?: Choice[]) => void;
  onLoaded: (play: Play) => void;
  onStart: () => void;
  onSave: (storedPlay: StoredPlay) => void;
  onLoad: () => Promise<StoredPlay>;
};

export class GameController {
  private static play: Play;

  static interpret(prompt: string): void {
    // let response: TextWrapper;
    // if (!response) {
    //   response = { en: '(nothing happens) ' };
    // }
    // this.play.getNarration().addSection({
    //   title: { fr: prompt },
    //   paragraphs: [
    //     {
    //       text: response,
    //     },
    //   ],
    // });
  }

  static setPlay(play: Play) {
    this.play = play;
  }

  static getPlay() {
    return this.play;
  }
}
