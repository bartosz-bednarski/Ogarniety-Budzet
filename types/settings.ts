export type CategoryItem = {
  catId: string;
  iconName: any;
  name: string;
  // onPress: (item: CategoryItem) => void;
};
export type CategoryItemRowProps = {
  catId: string;
  iconName: any; //powinien być string ale ionicons nie przyjmuje typu string jako argument do name
  name: string;
  // onPress: () => void;
};
export type PlannedExpenseCategoryItem = {
  catId: string;
  iconName: any;
  name: string;
  value: number;
};
export type OnSetCategoryIcon = (icon: string) => void;
export type OnSetInputText = (text: string) => void;
export type OnPressHandler = () => void;

export type AddEditCategoryProps = {
  onSetCategoryIcon: OnSetCategoryIcon;
  onSetInputText: OnSetInputText;
  onCategoryEdit: OnPressHandler;
  onCategoryDelete?: OnPressHandler;
  categoryIcon: any; //powinien być string ale ionicons nie przyjmuje typu string jako argument do name
  inputText: string;
  newCategory: boolean;
};
