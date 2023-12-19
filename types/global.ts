export type Navigation = {
  navigation: { navigate: (route: string, payload?: {}) => void };
};
export type Navigate = { navigate: (route: string, payload?: {}) => void };
export type Route = {
  params: any;
};
