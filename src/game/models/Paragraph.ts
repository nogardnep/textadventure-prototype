import { TextWrapper } from './Text';

export type Paragraph = {
  text: TextWrapper;
  condition?: () => boolean;
};
