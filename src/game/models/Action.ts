import { TextWrapper } from './Text';

export interface Action {
  text: TextWrapper;
  proceed: () => void;
  condition?: () => boolean;
  duration?: number
}
