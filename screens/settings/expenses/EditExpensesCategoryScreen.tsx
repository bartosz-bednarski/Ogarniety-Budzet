import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  deleteCategory,
  editCategory,
} from "../../../redux/expensesCategories-slice";
import AddEditCategory from "../../../components/settings/AddEditCategory";
import {
  OnPressHandler,
  OnSetCategoryIcon,
  OnSetInputText,
} from "../../../types/settings";
import {
  deleteAllExpensesFromCategory,
  updatePlannedExpenseCategory,
} from "../../../redux/expenses-slice";
const EditExpensesCategoryScreen: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const categoryName = route.params.name;
  const catId = route.params.catId;
  const iconName = route.params.iconName;
  const [inputText, setInputText] = useState(categoryName);
  const [categoryIcon, setCategoryIcon] = useState(iconName);
  const onSetCategoryIcon: OnSetCategoryIcon = (icon) => {
    setCategoryIcon(icon);
  };
  const onSetInputText: OnSetInputText = (text) => {
    setInputText(text);
  };
  const onCategoryEditHandler: OnPressHandler = () => {
    if (inputText.length < 20) {
      dispatch(
        editCategory({ catId: catId, name: inputText, iconName: categoryIcon })
      );
      dispatch(
        updatePlannedExpenseCategory({
          catId: catId,
          name: inputText,
          iconName: categoryIcon,
        })
      );
      navigation.navigate("editCategories");
    }
  };
  const onCategoryDeleteHandler: OnPressHandler = () => {
    dispatch(deleteCategory({ catId: catId }));
    dispatch(deleteAllExpensesFromCategory({ catId: catId }));
    navigation.navigate("editCategories");
  };
  return (
    <AddEditCategory
      onSetCategoryIcon={onSetCategoryIcon}
      onSetInputText={onSetInputText}
      onCategoryEdit={onCategoryEditHandler}
      onCategoryDelete={onCategoryDeleteHandler}
      categoryIcon={categoryIcon}
      inputText={inputText}
      newCategory={false}
    />
  );
};
export default EditExpensesCategoryScreen;
