import { Name } from 'src/game/core/models/Name';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { Character } from './entities/material/Character';

export type ConversationResponse = {
  paragraphs: Paragraph[];
  getSubjectTitle?: () => string;
  onAsked?: (author: Character) => void;
  check?: (author: Character) => boolean;
};

export type SubjectId = string;

export type Subject = {
  id: SubjectId;
  getName(): Name;
};
