import { ActionReport } from 'src/game/core/models/Action';
import { BaseActionKeys } from '../../../dictionnaries/actions';
import { ImmaterialEntity } from '../ImmaterialEntity';
import { Character } from '../material/Character';

export class Spell extends ImmaterialEntity {
  getDisplayedActionKeys() {
    return super.getDisplayedActionKeys().concat([BaseActionKeys.CastingOn]);
  }

  castedBy(author: Character): ActionReport {
    return { message: 'Le sortilège est sans effet', success: true };
  }
}
