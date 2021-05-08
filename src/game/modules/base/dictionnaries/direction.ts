import { Name } from 'src/game/core/models/Name';
import { NameWrapper } from 'src/game/core/models/Text';

export type DirectionKey = string;

export type Direction = {
  key: DirectionKey;
  name: NameWrapper;
};

export enum DirectionKeys {
  North = 'north',
  South = 'south',
  East = 'east',
  West = 'west',
  NorthEast = 'northEast',
  NorthWest = 'northWest',
  SouthEast = 'southEast',
  SouthWest = 'southWest',
  Up = 'up',
  Down = 'down',
  Inside = 'inside',
  Outside = 'outside',
}

export const BASE_DIRECTIONS: {
  [key in DirectionKeys]: Direction;
} = {
  north: {
    key: 'north',
    name: { fr: new Name('nord') },
  },
  south: {
    key: 'south',
    name: { fr: new Name('sud') },
  },
  east: {
    key: 'east',
    name: { fr: new Name('est') },
  },
  west: {
    key: 'west',
    name: { fr: new Name('ouest') },
  },
  northEast: {
    key: 'northWest',
    name: { fr: new Name('nord-est') },
  },
  northWest: {
    key: 'northWest',
    name: { fr: new Name('nord-ouest') },
  },
  southEast: {
    key: 'southEast',
    name: { fr: new Name('sud-est') },
  },
  southWest: {
    key: 'southWest',
    name: { fr: new Name('sud-ouest') },
  },
  up: {
    key: 'up',
    name: { fr: new Name('haut') },
  },
  down: {
    key: 'down',
    name: { fr: new Name('bas') },
  },
  inside: {
    key: 'inside',
    name: { fr: new Name('dedans') },
  },
  outside: {
    key: 'outside',
    name: { fr: new Name('dehors') },
  },
  // TODO
};

export function getOppositeDirection(key: DirectionKey): DirectionKey {
  let oppositeDirection: DirectionKey = null;

  switch (key) {
    case DirectionKeys.North:
      oppositeDirection = DirectionKeys.South;
      break;
    case DirectionKeys.South:
      oppositeDirection = DirectionKeys.North;
      break;
    case DirectionKeys.East:
      oppositeDirection = DirectionKeys.West;
      break;
    case DirectionKeys.West:
      oppositeDirection = DirectionKeys.East;
      break;
    case DirectionKeys.NorthEast:
      oppositeDirection = DirectionKeys.SouthWest;
      break;
    case DirectionKeys.NorthWest:
      oppositeDirection = DirectionKeys.SouthEast;
      break;
    case DirectionKeys.SouthEast:
      oppositeDirection = DirectionKeys.NorthWest;
      break;
    case DirectionKeys.SouthWest:
      oppositeDirection = DirectionKeys.NorthEast;
      break;
    case DirectionKeys.Up:
      oppositeDirection = DirectionKeys.Down;
      break;
    case DirectionKeys.Down:
      oppositeDirection = DirectionKeys.Up;
      break;
    case DirectionKeys.Inside:
      oppositeDirection = DirectionKeys.Outside;
      break;
    case DirectionKeys.Outside:
      oppositeDirection = DirectionKeys.Inside;
      break;
  }

  return oppositeDirection;
}
