import { Text, View, Modal, Alert, TextInput, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import {
  setBankAccountStatus,
  setCurrentYearPiggyBank,
} from "../../../redux/piggyBank-slice";
import {
  setCurrentYearIncomes,
  setIncome,
  updateIncome,
} from "../../../redux/incomes-slice";
import {
  setPlannedExpense,
  addPlannedExpense,
  addExpense,
  setExpense,
  setCurrentYearExpenses,
} from "../../../redux/expenses-slice";
import CustomButton from "../../../utils/ui/CustomButton";
import { addExpensesCategory } from "../../../redux/expensesCategories-slice";
import { addIncomesCategory } from "../../../redux/incomesCategories-slice";
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
  const expensesCategories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );

  const submitHandler = () => {
    dispatch(setCurrentYearIncomes());
    dispatch(setCurrentYearPiggyBank());
    dispatch(setCurrentYearExpenses());
    const randomId = function (length = 6) {
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };
    const incomeCatId = randomId(5);
    const catId = randomId(4);
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

      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId }));
      dispatch(updateIncome({ catId: incomeCatId, value: income }));

      dispatch(
        addExpensesCategory({
          name: "Inne",
          iconName: "star",
          catId: catId,
        })
      );
      dispatch(
        setExpense({
          catId: catId,
        })
      );
      dispatch(addExpense({ catId: catId, value: difference }));
      dispatch(
        setPlannedExpense({
          name: "Inne",
          iconName: "star",
          catId: catId,
        })
      );
      dispatch(
        setPlannedExpense({
          catId: catId,
          iconName: "star",
          name: "Inne",
        })
      );
      dispatch(addPlannedExpense({ catId: catId, value: difference }));

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
      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId }));
      dispatch(updateIncome({ catId: incomeCatId, value: income }));

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
