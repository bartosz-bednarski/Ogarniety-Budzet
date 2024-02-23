import AddEditCategory from "../../../components/settings/AddEditCategory";
import { useState } from "react";
import {
  OnPressHandler,
  OnSetCategoryIcon,
  OnSetInputText,
} from "../../../types/settings";
import { useAppDispatch } from "../../../redux/hooks";
import { addIncomesCategory } from "../../../redux/incomesCategories-slice";
import { setIncome } from "../../../redux/incomes-slice";
import { useAppSelector } from "../../../redux/hooks";
const AddNewIncomesCategoryScreen: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
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
      const catId = randomId(6);
      dispatch(
        addIncomesCategory({
          name: inputText,
          iconName: categoryIcon,
          catId: catId,
        })
      );
      dispatch(
        setIncome({
          catId: catId,
          bankAccountId: activeBankAccountStore.accountId,
        })
      );

      navigation.navigate("incomesCategoriesList");
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
export default AddNewIncomesCategoryScreen;
