import { Name } from 'src/game/core/models/Name';

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
