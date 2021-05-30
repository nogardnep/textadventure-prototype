import { Action, ActionContructor } from 'src/game/core/models/Action';
import { Audio } from 'src/game/core/models/Audio';
import { Entity, EntityType } from 'src/game/core/models/Entity';
import { Glossary } from 'src/game/core/models/Glossary';
import { Image } from 'src/game/core/models/Image';
import { Play } from 'src/game/core/models/Play';
import { Scenario, ScenarioId } from 'src/game/core/models/Scenario';
import { FrenchBaseGlossary } from 'src/game/modules/base/models/glossaries/FrenchBaseGlossary';
import { BASE_ACTIONS } from '../dictionnaries/actions';
import {
  Direction,
  DirectionKey,
  getOppositeDirection
} from '../dictionnaries/direction';
import { BASE_DIRECTIONS } from './../dictionnaries/direction';
import { BASE_SUBJECTS } from './../dictionnaries/subjects';
import { Subject } from './Conversation';
import { Place } from './entities/material/Place';
import { EnglishBaseGlossary } from './glossaries/EnglishBaseGlossary';

export type Starting = {
  maxSpells: number;
  caracteristicsPoints: number;
  availableSpells: EntityType[];
  askForName: boolean;
};

export abstract class BaseScenario extends Scenario {
  private directions: { [key: string]: Direction } = {};
  private starting: Starting;

  constructor(
    id: ScenarioId,
    params: {
      starting: Starting;
      entityConstructors: { [key: string]: new (play: Play) => Entity };
      glossaries?: { [languageKey: string]: Glossary };
      images?: { [key: string]: Image };
      audios?: { [key: string]: Audio };
      actions?: { [key: string]: ActionContructor };
      subjects?: { [key: string]: Subject };
      directions?: { [key: string]: Direction };
    }
  ) {
    super(id, params);

    this.starting = params.starting;

    this.setActions(BASE_ACTIONS);
    this.setDirection(BASE_DIRECTIONS);
    this.setGlossaries({
      fr: new FrenchBaseGlossary(),
      en: new EnglishBaseGlossary(),
    });
    this.setSubjects(BASE_SUBJECTS);

    if (params.actions) {
      this.setActions(params.actions);
    }

    if (params.glossaries) {
      this.setGlossaries(params.glossaries);
    }

    if (params.directions) {
      this.setDirection(params.directions);
    }

    if (params.subjects) {
      this.setSubjects(params.subjects);
    }
  }

  getDirections(): { [key: string]: Direction } {
    return this.directions;
  }

  getStarting(): Starting {
    return this.starting;
  }

  protected setDirection(directions: { [key: string]: Direction }): void {
    this.directions = Object.assign({}, this.directions, directions);
  }

  protected createConnection(
    play: Play,
    param: {
      first: {
        placeType: EntityType;
        text: string;
      };
      second: {
        placeType: EntityType;
        text: string;
      };
      connectionType?: EntityType;
      directionKeyForFirst?: DirectionKey;
      distance?: number;
    }
  ): void {
    const firstPlace = play.getFirstEntityOfType(
      param.first.placeType
    ) as Place;

    const secondPlace = play.getFirstEntityOfType(
      param.second.placeType
    ) as Place;

    let connection: Entity;

    if (param.connectionType) {
      connection = play.addEntity(param.connectionType);
    }

    firstPlace.addConnection({
      destinationId: secondPlace.getId(),
      text: param.first.text,
      directionKey: param.directionKeyForFirst,
      distance: param.distance,
      passageId: connection.getId(),
    });

    secondPlace.addConnection({
      destinationId: firstPlace.getId(),
      text: param.second.text,
      directionKey: getOppositeDirection(param.directionKeyForFirst),
      distance: param.distance,
      passageId: connection.getId(),
    });
  }
}
