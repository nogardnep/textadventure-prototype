import { Name } from '../models/Name';
import { NameWrapper } from './../models/Text';

export type DirectionKey = string;

export type Direction = {
  key: DirectionKey;
  name: NameWrapper;
};

export enum DirectionKeys {
  North = 'north',
  South = 'south',
  // TODO
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
    name: { fr: new Name('nord') },
  },
  // TODO
};

export function getOppositeDirection(key: DirectionKey): DirectionKey {
  let oppositeDirection: DirectionKey = null;

  switch (key) {
    case DirectionKeys.North:
      oppositeDirection = DirectionKeys.South;
      break;
    // TODO
  }

  return oppositeDirection;
}
