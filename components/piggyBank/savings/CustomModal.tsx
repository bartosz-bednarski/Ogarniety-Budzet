import { Text, View, Modal, Alert, TextInput, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
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
  setDateToUpdateWeek,
  setCurrentMonthExpenses,
} from "../../../redux/expenses-slice";
import CustomButton from "../../../utils/ui/CustomButton";
import { addExpensesCategory } from "../../../redux/expensesCategories-slice";
import { addIncomesCategory } from "../../../redux/incomesCategories-slice";
import COLORS_STYLE from "../../../utils/styles/colors";

const CustomModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const [bankAccountInput, setBankAccountInput] = useState("");
  const [incomesInput, setIncomesInput] = useState("");
  const [inputError, setInputError] = useState({ status: false, message: "" });

  useEffect(() => {
    Number(bankAccountInput) > 0 &&
      setInputError({ status: false, message: "" });
  }, [bankAccountInput]);

  const submitHandler = () => {
    dispatch(setCurrentMonthExpenses());
    dispatch(setDateToUpdateWeek());
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

    if (Number(bankAccountInput) === 0) {
      setInputError({
        status: true,
        message: "Wartość stanu konta powinna być większa niż 0.",
      });
    }

    if (Number(bankAccountInput) > 0 && Number(incomesInput) === 0) {
      dispatch(setBankAccountStatus(bankAccountInput));
      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId }));
      dispatch(updateIncome({ catId: incomeCatId, value: 0 }));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      Number(incomesInput) > Number(bankAccountInput)
    ) {
      //Utworz funkcje z ifa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
      dispatch(addPlannedExpense({ catId: catId, value: difference }));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
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
          {inputError.status && (
            <Text style={styles.errorText}>{inputError.message}</Text>
          )}
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
  errorText: {
    fontSize: 12,
    color: COLORS_STYLE.red,
    width: "100%",
    textAlign: "left",
    fontWeight: "700",
  },
});
export default CustomModal;
