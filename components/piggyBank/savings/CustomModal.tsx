import { Text, View, Modal, Alert, TextInput, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { setCurrentYearPiggyBank } from "../../../redux/piggyBank-slice";
import { setBankAccount } from "../../../redux/bankAccounts-slice";
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
  setPlannedExpensesNewCurrency,
} from "../../../redux/expenses-slice";
import CustomButton from "../../../utils/ui/CustomButton";
import { addExpensesCategory } from "../../../redux/expensesCategories-slice";
import { addIncomesCategory } from "../../../redux/incomesCategories-slice";
import COLORS_STYLE from "../../../utils/styles/colors";
import randomId from "../../../utils/randomIdFunction";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CustomModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const [bankAccountInput, setBankAccountInput] = useState("");
  const [incomesInput, setIncomesInput] = useState("");
  const [bankAccountInputError, setBankAccountInputError] = useState({
    status: false,
    message: "",
  });
  const [incomesInputError, setIncomesInputError] = useState({
    status: false,
    message: "",
  });
  useEffect(() => {
    Number(bankAccountInput) > 0 &&
      setBankAccountInputError({ status: false, message: "" });
    Number(incomesInput) >= 0 &&
      setIncomesInputError({ status: false, message: "" });
  }, [bankAccountInput]);

  const submitHandler = () => {
    const bankAccountId = "UNIQUE";
    const incomeCatId = randomId();
    const catId = randomId();
    dispatch(setCurrentMonthExpenses());
    dispatch(setDateToUpdateWeek());
    dispatch(setCurrentYearIncomes());
    dispatch(setCurrentYearPiggyBank());
    dispatch(setCurrentYearExpenses());

    if (Number(bankAccountInput) > 0 && Number(incomesInput) === 0) {
      dispatch(
        setBankAccount({
          bankAccountStatus: bankAccountInput,
          accountId: bankAccountId,
        })
      );
      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId, bankAccountId: bankAccountId }));
      dispatch(
        updateIncome({
          catId: incomeCatId,
          value: 0,
          bankAccountId: bankAccountId,
        })
      );
      dispatch(setPlannedExpensesNewCurrency({ currency: "PLN" }));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      Number(incomesInput) > Number(bankAccountInput)
    ) {
      const difference = Number(incomesInput) - Number(bankAccountInput) + 1;
      const income = Number(incomesInput);

      dispatch(
        setBankAccount({ bankAccountStatus: 1, accountId: bankAccountId })
      );
      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId, bankAccountId: bankAccountId }));
      dispatch(
        updateIncome({
          catId: incomeCatId,
          value: income,
          bankAccountId: bankAccountId,
        })
      );
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
          bankAccountId: bankAccountId,
        })
      );
      dispatch(
        addExpense({
          catId: catId,
          value: difference,
          bankAccountId: bankAccountId,
        })
      );
      dispatch(setPlannedExpensesNewCurrency({ currency: "PLN" }));
      dispatch(
        setPlannedExpense({
          name: "Inne",
          iconName: "star",
          catId: catId,
        })
      );

      dispatch(
        addPlannedExpense({ catId: catId, value: difference, currency: "PLN" })
      );
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      Number(bankAccountInput) > Number(incomesInput)
    ) {
      const difference = Number(bankAccountInput) - Number(incomesInput);
      const income = Number(incomesInput) - 1;
      dispatch(
        setBankAccount({
          bankAccountStatus: difference,
          accountId: bankAccountId,
        })
      );
      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId, bankAccountId: bankAccountId }));
      dispatch(
        updateIncome({
          catId: incomeCatId,
          value: income,
          bankAccountId: bankAccountId,
        })
      );
      dispatch(setPlannedExpensesNewCurrency({ currency: "PLN" }));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      Number(incomesInput) === Number(bankAccountInput)
    ) {
      const income = Number(incomesInput);
      dispatch(
        setBankAccount({ bankAccountStatus: 1, accountId: bankAccountId })
      );
      dispatch(
        addIncomesCategory({
          name: "Inne",
          iconName: "star",
          catId: incomeCatId,
        })
      );
      dispatch(setIncome({ catId: incomeCatId, bankAccountId: bankAccountId }));
      dispatch(
        updateIncome({
          catId: incomeCatId,
          value: income,
          bankAccountId: bankAccountId,
        })
      );
      dispatch(setPlannedExpensesNewCurrency({ currency: "PLN" }));
      setModalVisible(false);
    }
    if (Number(incomesInput) < 0) {
      setIncomesInputError({
        status: true,
        message: "Kwota przychodów powinna być większa lub równa 0!",
      });
    }
    if (Number(bankAccountInput) < 1) {
      setBankAccountInputError({
        status: true,
        message: "Stan konta powinien być większy lub równy 1!",
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Dane nie zostały zapisane!");
        setIncomesInputError({ message: "", status: false });
        setBankAccountInputError({ message: "", status: false });
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
            placeholder="10000"
            placeholderTextColor={COLORS_STYLE.labelGrey}
            accessibilityLabel="stan konta"
          />
          {bankAccountInputError.status && (
            <Text style={styles.errorText}>
              {bankAccountInputError.message}
            </Text>
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
            placeholder="5000"
            placeholderTextColor={COLORS_STYLE.labelGrey}
            accessibilityLabel="kwota przychodów"
          />
          {incomesInputError.status && (
            <Text style={styles.errorText}>{incomesInputError.message}</Text>
          )}
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
    gap: 10,
  },
  modalHeader: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "600",
    color: COLORS_STYLE.basicGold,
  },
  modalLabel: {
    fontSize: 12,
    textAlign: "left",
    width: "100%",
    marginLeft: 5,
    color: "white",
    marginTop: 5,
  },
  modalInfo: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS_STYLE.basicGold,
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
    marginBottom: 5,
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
