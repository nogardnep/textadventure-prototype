import { TextWrapper } from './Text';

export type Paragraph = {
  text: TextWrapper;
  check?: () => boolean;
};
