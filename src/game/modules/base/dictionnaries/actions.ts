import { ActionContructor } from 'src/game/core/models/Action';
import { Attacking } from '../models/actions/Attacking';
import { CastingOn } from '../models/actions/CastingOn';
import { Closing } from '../models/actions/Closing';
import { Cross } from '../models/actions/Cross';
import { Dropping } from '../models/actions/Dropping';
import { GoingTo } from '../models/actions/GoingTo';
import { Holding } from '../models/actions/Holding';
import { LookingAt } from '../models/actions/LookingAt';
import { Opening } from '../models/actions/Opening';
import { Pulling } from '../models/actions/Pulling';
import { Putting } from '../models/actions/Putting';
import { Releasing } from '../models/actions/Releasing';
import { Shooting } from '../models/actions/Shooting';
import { Taking } from '../models/actions/Taking';
import { Talking } from '../models/actions/Talking';

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
  LookingAt = 'lookingAt',
  Shooting = 'Shooting',
}

export const BASE_ACTIONS: { [key in BaseActionKeys]: ActionContructor } = {
  [BaseActionKeys.Taking]: Taking,
  [BaseActionKeys.Dropping]: Dropping,
  [BaseActionKeys.Opening]: Opening,
  [BaseActionKeys.Closing]: Closing,
  [BaseActionKeys.Putting]: Putting,
  [BaseActionKeys.Pulling]: Pulling,
  [BaseActionKeys.CastingOn]: CastingOn,
  [BaseActionKeys.Holding]: Holding,
  [BaseActionKeys.Releasing]: Releasing,
  [BaseActionKeys.GoingTo]: GoingTo,
  [BaseActionKeys.Attacking]: Attacking,
  [BaseActionKeys.Talking]: Talking,
  [BaseActionKeys.Cross]: Cross,
  [BaseActionKeys.LookingAt]: LookingAt,
  [BaseActionKeys.Shooting]: Shooting,
};
