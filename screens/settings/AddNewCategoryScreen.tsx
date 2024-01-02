import AddEditCategory from "../../components/settings/AddEditCategory";
import { useState } from "react";
import {
  OnPressHandler,
  OnSetCategoryIcon,
  OnSetInputText,
} from "../../types/settings";
import { useAppDispatch } from "../../redux/hooks";
import { addCategory } from "../../redux/categories-slice";
import { setExpense, setPlannedExpense } from "../../redux/expenses-slice";
const AddNewCategoryScreen: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("add-circle-outline");
  const onSetCategoryIcon: OnSetCategoryIcon = (icon) => {
    setCategoryIcon(icon);
  };
  const onSetInputText: OnSetInputText = (text) => {
    setInputText(text);
  };
  const onPressHandler: OnPressHandler = () => {
    if (inputText.length < 20) {
      const randomId = function (length = 6) {
        return Math.random()
          .toString(36)
          .substring(2, length + 2);
      };
      const catId = randomId(4);
      dispatch(
        addCategory({ name: inputText, iconName: categoryIcon, catId: catId })
      );
      dispatch(
        setPlannedExpense({
          name: inputText,
          iconName: categoryIcon,
          catId: catId,
        })
      );
      dispatch(setExpense({ catId: catId }));
      navigation.navigate("editCategories");
    }
  };
  return (
    <AddEditCategory
      onSetCategoryIcon={onSetCategoryIcon}
      onSetInputText={onSetInputText}
      onCategoryEdit={onPressHandler}
      categoryIcon={categoryIcon}
      inputText={inputText}
      newCategory={true}
    />
  );
};
export default AddNewCategoryScreen;
