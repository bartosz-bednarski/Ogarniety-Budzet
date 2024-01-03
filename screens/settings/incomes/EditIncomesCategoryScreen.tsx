import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import AddEditCategory from "../../../components/settings/AddEditCategory";
import {
  OnPressHandler,
  OnSetCategoryIcon,
  OnSetInputText,
} from "../../../types/settings";
import {
  deleteIncomesCategory,
  editIncomesCategory,
} from "../../../redux/incomesCategories-slice";
import { deleteIncome } from "../../../redux/incomes-slice";
const EditIncomesCategoryScreen: React.FC<{
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
        editIncomesCategory({
          catId: catId,
          name: inputText,
          iconName: categoryIcon,
        })
      );

      navigation.navigate("incomesCategoriesList");
    }
  };
  const onCategoryDeleteHandler: OnPressHandler = () => {
    dispatch(deleteIncomesCategory({ catId: catId }));
    dispatch(deleteIncome({ catId: catId }));
    navigation.navigate("incomesCategoriesList");
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
export default EditIncomesCategoryScreen;
