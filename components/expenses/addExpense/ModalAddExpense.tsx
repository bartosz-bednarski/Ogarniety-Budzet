import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
const ModalAddExpense: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  submitHandler: () => void;
}> = ({ modalVisible, setModalVisible, value, setValue, submitHandler }) => {
  const [error, setError] = useState({ state: false, message: "" });
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const realisedTargets = useAppSelector(
    (state) => state.piggyBank.realisedTargets
  );
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  let monthIncomesSum;
  let bankAccountPlusIncomes;
  let monthExpensesSum;
  let totalBankAccount: number;
  let sumOfRealisedTargets;
  if (realisedTargets !== undefined) {
    if (realisedTargets.length > 0) {
      sumOfRealisedTargets = realisedTargets
        .map((item) => item.targetValue)
        .reduce((partialSum, a) => partialSum + a, 0);
    } else {
      sumOfRealisedTargets = 0;
    }
  } else {
    sumOfRealisedTargets = 0;
  }
  if (monthIncomes.length > 0 && categoriesExpenses.length > 0) {
    monthIncomesSum = monthIncomes
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    monthExpensesSum = categoriesExpenses
      .map((item) => Number(item.sum))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount =
      bankAccountPlusIncomes - monthExpensesSum - sumOfRealisedTargets;
  } else if (monthIncomes.length > 0) {
    monthIncomesSum = monthIncomes
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes = bankAccountStatus;
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes - sumOfRealisedTargets;
  } else {
    totalBankAccount = bankAccountStatus - sumOfRealisedTargets;
  }
  console.log(totalBankAccount);

  const submitCheck = () => {
    if (Number(value) < totalBankAccount) {
      submitHandler();
      setError({ state: false, message: "" });
    } else {
      setError({ state: true, message: "Nie masz tyle środków na koncie!" });
    }
  };
  return (
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
          <Text style={styles.label}>Dodajesz nowy wydatek</Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
            placeholder="Podaj kwotę"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {error.state && (
            <>
              <Text style={styles.error}>{error.message}</Text>
              <Text style={styles.error}>
                Dostępne środki: {totalBankAccount - 1} PLN
              </Text>
            </>
          )}
          <View style={styles.modalButtonsBox}>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>Anuluj</Text>
            </Pressable>
            <Text style={styles.textGold}>|</Text>
            <Pressable style={styles.modalButton} onPress={submitCheck}>
              <Text style={styles.modalButtonText}>Zapisz</Text>
            </Pressable>
          </View>
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
    backgroundColor: COLORS_STYLE.tabGrey,
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
    fontSize: 20,
    marginBottom: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "500",
  },
  error: {
    color: COLORS_STYLE.red,
    marginBottom: 10,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
    marginBottom: 20,
  },
  modalButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    justifyContent: "center",
    width: "40%",
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  textGold: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
  },
});

export default ModalAddExpense;
