import { Name } from 'src/game/core/models/Name';
import { Character } from './entities/material/Character';

export type ConversationResponse = {
  getSubjectTitle?: () => string;
  onAsked?: (author: Character) => void;
  check?: (author: Character) => boolean;
  text: string;
};

export type SubjectId = string;

export type Subject = {
  id: SubjectId;
  getName(): Name;
};
