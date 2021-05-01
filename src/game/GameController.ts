import { TestScenario } from '../scenari/TestScenario';
import { Action } from './models/Action';
import { Entity, EntityType } from './models/Entity';
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

const SCENARIO = TestScenario; // TODO: move

export class GameController {
  private static play: Play;
  private static storedPlay: StoredPlay;
  private static callbacks: Callbacks;

  static init(callbacks: Callbacks): void {
    this.callbacks = callbacks;
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

  static startNewPlay(): void {
    this.storedPlay = {
      narration: null,
      playerId: null,
      storedEntities: {},
      time: null,
    };

    this.play = new Play(new SCENARIO());
    this.play.init();

    this.savePlay();
    this.callbacks.onLoaded(this.play);
  }

  static getStoredPlay(): StoredPlay {
    return this.storedPlay;
  }

  static savePlay(): void {
    this.callbacks.onSave(this.storedPlay);
  }

  static loadPlay(): void {
    this.callbacks
      .onLoad()
      .then((storedPlay: StoredPlay) => {
        this.storedPlay = storedPlay;

        this.play = new Play(new SCENARIO());
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

  static saveEntity(entity: Entity): void {
    this.getPlay().saveEntity(entity);
  }
}
