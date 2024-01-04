export type Button = {
  onPress: () => void;
  title: string;
};
export type CategoryItemBoxProps = {
  category: {
    catId: string;
    iconName?: string;
    name?: string;
    value: number;
  };
  onPressHandler: () => void;
};
