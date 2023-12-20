export type Navigation = { navigate: (route: string, payload?: {}) => void };
export type Navigate = (route: string, payload?: {}) => void;
export type Route = {
  params: any;
};
