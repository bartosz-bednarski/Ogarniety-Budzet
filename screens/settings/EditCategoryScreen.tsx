import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Navigate, Navigation, Route } from "../../types/global";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { Button } from "react-native";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { editCategory } from "../../redux/categories-slice";
import AddEditCategory from "../../components/settings/AddEditCategory";
import {
  OnPressHandler,
  OnSetCategoryIcon,
  OnSetInputText,
} from "../../types/settings";
import { updatePlannedExpenseCategory } from "../../redux/expenses-slice";
const EditCategoryScreen: React.FC<{
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
  const onPressHandler: OnPressHandler = () => {
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
  return (
    <AddEditCategory
      onSetCategoryIcon={onSetCategoryIcon}
      onSetInputText={onSetInputText}
      onPressHandler={onPressHandler}
      categoryIcon={categoryIcon}
      inputText={inputText}
    />
  );
};
export default EditCategoryScreen;
