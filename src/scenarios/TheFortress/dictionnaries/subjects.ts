import { Name } from 'src/game/core/models/Name';
import { Subject } from 'src/game/modules/base/models/Conversation';

export const SUBJECTS = {
  azkarar: {
    id: 'azkarar',
    getName: () => {
      return new Name('Azkarar', {
        properNoun: true,
      });
    },
  },
};
