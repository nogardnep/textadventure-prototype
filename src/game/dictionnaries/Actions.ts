import { release } from './actions/release';
import { hold } from './actions/hold';
import { close } from './actions/close';
import { put } from './actions/put';
import { pull } from './actions/pull';
import { drop } from './actions/drop';
import { Character } from 'src/game/models/entities/material/Character';
import { TextWrapper } from '../models/Text';
import { cast } from './actions/cast';
import { take } from './actions/take';
import { open } from './actions/open';

export type Action = {
  text: TextWrapper;
  patterns?: [];
  check: (
    author: Character,
    ...args: any[]
  ) => {
    success: boolean;
    failureMessage?: TextWrapper;
  };
  proceed: (author: Character, ...args: any[]) => boolean | void;
  duration?: number;
};

export const DEFAULT_ACTION_DURATION = 1;

export type ActionKey = string;

export enum ActionKeys {
  Take = 'take',
  Drop = 'drop',
  Cast = 'cast',
  Close = 'close',
  Open = 'open',
  Pull = 'pull',
  Put = 'put',
  Hold = 'hold',
  Release = 'release',
}

export const BASE_ACTIONS: {
  [key in ActionKeys]: Action;
} = {
  take,
  drop,
  cast,
  close,
  open,
  pull,
  put,
  hold,
  release,
};
