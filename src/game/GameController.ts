import { Scenario, Scenarios } from 'src/game/models/Scenario';
import { Action } from './models/Action';
import { Paragraph } from './models/Paragraph';
import { Play, StoredPlay } from './models/Play';
import { TextWrapper } from './models/Text';

type Callbacks = {
  onInform: (paragraphs: Paragraph[], actions?: Action[]) => void;
  onLoaded: (play: Play) => void;
  onStart: () => void;
  onSave: (storedPlay: StoredPlay) => void;
  onLoad: () => Promise<StoredPlay>;
};

export class GameController {
  private static play: Play;
  private static callbacks: Callbacks;
  private static scenarios: Scenarios;

  static init(callbacks: Callbacks, scenarios: Scenarios): void {
    this.callbacks = callbacks;
    this.scenarios = scenarios;
  }

  static inform(paragraphs: Paragraph[], actions?: Action[]) {
    this.callbacks.onInform(paragraphs, actions);
  }

  static interpret(prompt: string): void {
    let response: TextWrapper;

    if (!response) {
      response = { en: '(nothing happens) ' };
    }

    this.play.getNarration().addSection({
      title: { fr: prompt },
      paragraphs: [
        {
          text: response,
        },
      ],
    });
  }

  static getScenarios(): Scenarios {
    return this.scenarios;
  }

  static startNewPlay(scenario: Scenario): void {
    this.play = new Play(scenario);
    this.play.init();

    this.savePlay();
    this.callbacks.onLoaded(this.play);
  }

  static savePlay(): void {
    this.callbacks.onSave(this.getPlay().getStored());
  }

  static loadPlay(): void {
    this.callbacks
      .onLoad()
      .then((storedPlay: StoredPlay) => {
        this.play = new Play(this.scenarios[storedPlay.scenarioId]);
        this.play.load(storedPlay);
        this.callbacks.onLoaded(this.play);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static getPlay(): Play {
    return this.play;
  }

  static narrate(paragraphs: Paragraph[]): void {
    this.play.getNarration().addSection({ paragraphs });
  }

  static useAction(action: Action): void {
    action.proceed();
    this.play.increaseTime(action.duration !== undefined ? action.duration : 1);
    this.savePlay();
  }
}
