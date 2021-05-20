import { Name } from 'src/game/core/models/Name';

export type DirectionKey = string;

export type Direction = {
  key: DirectionKey;
  name: Name;
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
    name: new Name('nord'),
  },
  south: {
    key: 'south',
    name: new Name('sud'),
  },
  east: {
    key: 'east',
    name: new Name('est', {
      elision: true,
    }),
  },
  west: {
    key: 'west',
    name: new Name('ouest'),
  },
  northEast: {
    key: 'northWest',
    name: new Name('nord-est'),
  },
  northWest: {
    key: 'northWest',
    name: new Name('nord-ouest'),
  },
  southEast: {
    key: 'southEast',
    name: new Name('sud-est'),
  },
  southWest: {
    key: 'southWest',
    name: new Name('sud-ouest'),
  },
  up: {
    key: 'up',
    name: new Name('haut'),
  },
  down: {
    key: 'down',
    name: new Name('bas'),
  },
  inside: {
    key: 'inside',
    name: new Name('dedans'),
  },
  outside: {
    key: 'outside',
    name: new Name('dehors'),
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
