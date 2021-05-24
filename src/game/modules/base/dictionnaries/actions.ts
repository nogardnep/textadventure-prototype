import { CastingOn } from '../models/actions/CastingOn';
import { Closing } from '../models/actions/Closing';
import { Dropping } from '../models/actions/Dropping';
import { GoingTo } from '../models/actions/GoingTo';
import { Holding } from '../models/actions/Holding';
import { Opening } from '../models/actions/Opening';
import { Pulling } from '../models/actions/Pulling';
import { Putting } from '../models/actions/Putting';
import { Releasing } from '../models/actions/Releasing';
import { Taking } from '../models/actions/Taking';
import { Attacking } from '../models/actions/Attacking';
import { Talking } from '../models/actions/Talking';
import { Action } from 'src/game/core/models/Action';
import { Cross } from '../models/actions/Cross';

export enum BaseActionKeys {
  Taking = 'taking',
  Dropping = 'dropping',
  Opening = 'opening',
  Closing = 'closing',
  Putting = 'putting',
  Pulling = 'pulling',
  CastingOn = 'castingOn',
  Holding = 'holding',
  Releasing = 'releasing',
  GoingTo = 'goingTo',
  Attacking = 'attacking',
  Talking = 'talking',
  Cross = 'cross',
}

export const BASE_ACTIONS: { [key in BaseActionKeys]: Action } = {
  taking: new Taking(),
  dropping: new Dropping(),
  opening: new Opening(),
  closing: new Closing(),
  putting: new Putting(),
  pulling: new Pulling(),
  castingOn: new CastingOn(),
  holding: new Holding(),
  releasing: new Releasing(),
  goingTo: new GoingTo(),
  attacking: new Attacking(),
  talking: new Talking(),
  cross: new Cross(),
};
