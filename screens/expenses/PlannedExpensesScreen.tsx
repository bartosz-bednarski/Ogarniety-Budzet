import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import CategoryItemBox from "../../components/expenses/CategoryItemBox";
import { addPlannedExpense } from "../../redux/expenses-slice";
import COLORS_STYLE from "../../utils/styles/colors";
import CustomButton from "../../utils/ui/CustomButton";
const PlannedExpensesScreen = () => {
  const dispatch = useAppDispatch();
  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  // console.log("plannedExpenses", plannedExpenses);
  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };
  const submitHandler = () => {
    if (value !== "" && value !== "0") {
      dispatch(addPlannedExpense({ catId: selectedCatId, value: value }));
      setValue("");
    }
    setModalVisible(!modalVisible);
  };
  const sumOfPlannedExpenses = plannedExpenses
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Wydatek nie został dodany!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalLayout}>
          <View style={styles.modalView}>
            <Text style={styles.modalLabel}>Podaj kwotę</Text>
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
      <Text style={styles.header}>
        Zaplanowano do wydania {sumOfPlannedExpenses} PLN
      </Text>
      <FlatList
        data={plannedExpenses}
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
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
  categoriesBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
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
  modalLabel: {
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
export default PlannedExpensesScreen;
