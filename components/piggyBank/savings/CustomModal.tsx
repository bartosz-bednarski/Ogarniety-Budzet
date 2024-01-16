import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import { setBankAccountStatus } from "../../../redux/piggyBank-slice";
import { setIncome, updateIncome } from "../../../redux/incomes-slice";
import {
  setPlannedExpense,
  addPlannedExpense,
  addExpense,
} from "../../../redux/expenses-slice";
import CustomButton from "../../../utils/ui/CustomButton";
const CustomModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();
  const [bankAccountInput, setBankAccountInput] = useState("");
  const [incomesInput, setIncomesInput] = useState("");
  const categoriesIncomes = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );

  const submitHandler = () => {
    if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) === 0 &&
      bankAccountInput.length > 0 &&
      incomesInput.length > 0
    ) {
      dispatch(setBankAccountStatus(bankAccountInput));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      bankAccountInput.length > 0 &&
      incomesInput.length > 0 &&
      Number(incomesInput) > Number(bankAccountInput)
    ) {
      const difference = Number(incomesInput) - Number(bankAccountInput) + 1;
      const income = Number(incomesInput);
      dispatch(setBankAccountStatus(1));
      dispatch(setIncome({ catId: "#DIFFINCOMES" }));
      dispatch(
        updateIncome({ catId: categoriesIncomes[0].catId, value: income })
      );
      // dispatch(setExpense("#DIFFEXPENSES"));
      dispatch(
        setPlannedExpense({
          catId: "#DIFFEXPENSES",
          iconName: "star",
          name: "Inne",
        })
      );
      dispatch(
        addPlannedExpense({ catId: "#DIFFEXPENSES", value: difference })
      );
      dispatch(addExpense({ catId: "#DIFFEXPENSES", value: difference }));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      bankAccountInput.length > 0 &&
      incomesInput.length > 0 &&
      Number(bankAccountInput) > Number(incomesInput)
    ) {
      const difference = Number(bankAccountInput) - Number(incomesInput);
      const income = Number(incomesInput) - 1;
      dispatch(setBankAccountStatus(difference));
      dispatch(setIncome({ catId: "#DIFFINCOMES" }));
      dispatch(updateIncome({ catId: "#DIFFINCOMES", value: income }));
      setModalVisible(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Dane nie zostały zapisane!");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Uzupełnij dane</Text>
          <Text style={styles.modalLabel}>
            Podaj swój stan konta na dzień dzisiejszy
          </Text>
          <TextInput
            style={styles.textInput}
            value={bankAccountInput}
            onChangeText={(text) => setBankAccountInput(text)}
            keyboardType="numeric"
            maxLength={10}
          />

          <Text style={styles.modalLabel}>
            Podaj kwotę przychodów uzyskanych w tym miesiącu
          </Text>
          <TextInput
            style={styles.textInput}
            value={incomesInput}
            onChangeText={(text) => setIncomesInput(text)}
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={styles.modalInfo}>
            Jeżeli nie uzyskałeś jeszcze przychodów w tym miesiącu wpisz 0. Po
            ich otrzymaniu wprowadź kwotę w zakładce "Przychody".
          </Text>
          <CustomButton title="Zatwierdź" onPress={submitHandler} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "90%",
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
  modalHeader: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "600",
  },
  modalLabel: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
    marginLeft: 5,
  },
  modalInfo: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
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
export default CustomModal;
