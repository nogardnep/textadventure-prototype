import { Name } from 'src/game/core/models/Name';
import { Subject } from '../models/Conversation';

export const BASE_SUBJECTS: { [key: string]: Subject } = {
  self: {
    id: 'self',
    getName() {
      return new Name('lui');
    },
  },
};
