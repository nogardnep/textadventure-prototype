import { BASE_DIRECTIONS } from './../dictionnaries/direction';
import { FrenchBaseGlossary } from 'src/game/modules/base/models/glossaries/FrenchBaseGlossary';
import { BASE_ACTIONS } from '../dictionnaries/actions';
import { Entity, EntityType } from 'src/game/core/models/Entity';
import { Play } from 'src/game/core/models/Play';
import { Scenario } from 'src/game/core/models/Scenario';
import { TextWrapper } from 'src/game/core/models/Text';
import {
  Direction,
  DirectionKey,
  getOppositeDirection,
} from '../dictionnaries/direction';
import { Place } from './entities/material/Place';

export abstract class BaseScenario extends Scenario {
  directions: { [key: string]: Direction } = {};
  starting: {
    maxSpells: number;
    caracteristicsPoints: number;
    availableSpells: EntityType[];
    askForName: boolean;
  };

  constructor() {
    super();

    this.actions = Object.assign({}, this.actions, BASE_ACTIONS);
    this.glossaries = Object.assign({}, this.glossaries, {
      fr: new FrenchBaseGlossary(),
    });
    this.directions = BASE_DIRECTIONS;
  }

  protected createConnection(
    play: Play,
    param: {
      first: {
        placeType: EntityType;
        text: TextWrapper;
      };
      second: {
        placeType: EntityType;
        text: TextWrapper;
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
