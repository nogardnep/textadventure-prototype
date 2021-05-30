import { Choice } from "./Choice";
import { Paragraph } from "./Paragraph";

export type Message =  {
  paragraphs: Paragraph[],
  choices?: Choice[],
  onRead?: () => void
}
