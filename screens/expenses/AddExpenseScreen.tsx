import { View, StyleSheet, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { addExpense } from "../../redux/expenses-slice";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import CircleStringColorButton from "../../utils/ui/CircleStringColorButton";
import ModalAddExpense from "../../components/expenses/addExpense/ModalAddExpense";
const AddExpenseScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );
  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };
  const submitHandler = () => {
    if (value !== "" && value !== "0") {
      dispatch(addExpense({ catId: selectedCatId, value: value }));
      setValue("");
    }
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {categories.length === 0 && (
        <View style={styles.informationBox}>
          <CustomButton
            title="Dodaj kategorie wydatków"
            onPress={() =>
              navigation.navigate("settingsNavigator", {
                screen: "editCategories",
              })
            }
          />
        </View>
      )}
      <ModalAddExpense
        modalVisible={modalVisible}
        setModalVisible={(value) => setModalVisible(value)}
        value={value}
        setValue={(value) => setValue(value)}
        submitHandler={submitHandler}
      />

      <View style={styles.flatlistBox}>
        {categories.map((item, index) => (
          <CircleStringColorButton
            key={item.catId}
            iconName={item.iconName}
            catId={item.catId}
            name={item.name}
            color={index}
            onPressHandler={() => onPressHandler(item.catId)}
          />
        ))}
        <CircleStringColorButton
          iconName="add"
          catId="addNewExpenseCategoy"
          name="Dodaj nową kategorię"
          color={20}
          onPressHandler={() =>
            navigation.navigate("settingsNavigator", {
              screen: "addNewCategory",
            })
          }
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },

  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  flatlistBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
export default AddExpenseScreen;
