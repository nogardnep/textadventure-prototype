import { TextWrapper } from './Text';

export type Choice = {
  text: TextWrapper;
  proceed: () => void;
  check?: () => boolean;
};
