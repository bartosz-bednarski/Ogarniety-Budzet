import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  Button,
  TextInput,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CategoryItemBox from "../../components/expenses/CategoryItemBox";
import { useState } from "react";
import { addExpense } from "../../redux/expenses-slice";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
const AddExpenseScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categoriesList);
  console.log(categories);
  const expenses = useAppSelector((state) => state.expenses.categoriesExpenses);
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
    <View style={styles.container}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Zmiany nie zostały wprowadzone!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalLayout}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Podaj kwotę</Text>
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={(text) => setValue(text)}
              keyboardType="numeric"
            />
            <CustomButton title="Zatwierdź" onPress={submitHandler} />
          </View>
        </View>
      </Modal>
      <FlatList
        scrollEnabled={true}
        data={categories}
        renderItem={(item) => {
          return (
            <CategoryItemBox
              category={item.item}
              onPressHandler={() => onPressHandler(item.item.catId)}
            />
          );
        }}
        keyExtractor={(item) => item.catId.toString()}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        numColumns={3}
      />
    </View>
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
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "#dddbdb",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "black",
    marginBottom: 20,
  },
});
export default AddExpenseScreen;
