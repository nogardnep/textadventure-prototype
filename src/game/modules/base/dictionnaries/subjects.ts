import { Subject } from '../models/Conversation';

export const BASE_SUBJECTS: { [key: string]: Subject } = {
  himself: {
    id: 'himself',
    getTitle() {
      return 'lui'
    }
  },
};
