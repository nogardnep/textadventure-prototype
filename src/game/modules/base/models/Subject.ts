
export type Subject = {
  title: string;
  onAsked: () => void;
  check?: () => boolean;
};
