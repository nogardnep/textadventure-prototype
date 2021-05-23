import { Character } from './entities/material/Character';

export type ConversationResponse = {
  onAsked: (author: Character) => void;
  check?: (author: Character) => boolean;
};

export type SubjectId = string;

export type Subject = {
  id: SubjectId;
  getTitle(): string;
};
