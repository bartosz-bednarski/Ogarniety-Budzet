export type CategoryItem = {
  catId: number;
  iconName: any;
  name: string;
  // onPress: (item: CategoryItem) => void;
};
export type CategoryItemRowProps = {
  catId: number;
  iconName: any; //powinien być string ale ionicons nie przyjmuje typu string jako argument do name
  name: string;
  // onPress: () => void;
};

export type OnSetCategoryIcon = (icon: string) => void;
export type OnSetInputText = (text: string) => void;
export type OnPressHandler = () => void;

export type AddEditCategoryProps = {
  onSetCategoryIcon: OnSetCategoryIcon;
  onSetInputText: OnSetInputText;
  onPressHandler: OnPressHandler;
  categoryIcon: any; //powinien być string ale ionicons nie przyjmuje typu string jako argument do name
  inputText: string;
};
