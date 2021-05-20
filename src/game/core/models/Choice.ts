
export type Choice = {
  text: string;
  proceed: () => void;
  check?: () => boolean;
};
