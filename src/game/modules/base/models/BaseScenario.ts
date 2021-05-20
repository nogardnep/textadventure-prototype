import { ScenarioId } from 'src/game/core/models/Scenario';
import { Action } from 'src/game/core/models/Action';
import { Audio } from 'src/game/core/models/Audio';
import { Entity, EntityType } from 'src/game/core/models/Entity';
import { Glossary } from 'src/game/core/models/Glossary';
import { Image } from 'src/game/core/models/Image';
import { Play } from 'src/game/core/models/Play';
import { Scenario } from 'src/game/core/models/Scenario';
import { FrenchBaseGlossary } from 'src/game/modules/base/models/glossaries/FrenchBaseGlossary';
import { BASE_ACTIONS } from '../dictionnaries/actions';
import {
  Direction,
  DirectionKey,
  getOppositeDirection,
} from '../dictionnaries/direction';
import { BASE_DIRECTIONS } from './../dictionnaries/direction';
import { Place } from './entities/material/Place';
import { EnglishBaseGlossary } from './glossaries/EnglishBaseGlossary';

export abstract class BaseScenario extends Scenario {
  directions: { [key: string]: Direction } = {};
  starting: {
    maxSpells: number;
    caracteristicsPoints: number;
    availableSpells: EntityType[];
    askForName: boolean;
  };

  constructor(
    id: ScenarioId,
    params: {
      glossaries?: { [languageKey: string]: Glossary };
      entityConstructors: { [key: string]: new (play: Play) => Entity };
      images?: { [key: string]: Image };
      audios?: { [key: string]: Audio };
      actions?: { [key: string]: Action };
    }
  ) {
    super(id, params);

    this.setActions(BASE_ACTIONS);
    this.setDirection(BASE_DIRECTIONS);
    this.setGlossaries({
      fr: new FrenchBaseGlossary(),
      en: new EnglishBaseGlossary(),
    });

    if (params.actions) {
      this.setActions(params.actions);
    }

    if (params.glossaries) {
      this.setGlossaries(params.glossaries);
    }
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
