import { TextWrapper } from 'src/game/core/models/Text';

export type Subject = {
  title: TextWrapper;
  onAsked: () => void;
  check?: () => boolean;
};
