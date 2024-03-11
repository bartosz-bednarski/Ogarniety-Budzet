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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import {
  addBankAccount,
  setBankAccount,
} from "../../../redux/bankAccounts-slice";
import randomId from "../../../utils/randomIdFunction";
import {
  addExpense,
  addPlannedExpense,
  createNewBankAccountInitialExpensesSetup,
  setExpense,
  setPlannedExpense,
  setPlannedExpensesNewCurrency,
} from "../../../redux/expenses-slice";
import { addIncomesCategory } from "../../../redux/incomesCategories-slice";
import { setIncome, updateIncome } from "../../../redux/incomes-slice";
import { addExpensesCategory } from "../../../redux/expensesCategories-slice";

const ModalAddBankAccount: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();
  const monthCategoriesExpensesStore = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );

  const [errorAccountName, setErrorAccountName] = useState({
    state: false,
    message: "",
  });
  const [bankAccountInputError, setBankAccountInputError] = useState({
    state: false,
    message: "",
  });
  const [incomesInputError, setIncomesInputError] = useState({
    state: false,
    message: "",
  });
  const [errorCurrency, setErrorCurrency] = useState({
    state: false,
    message: "",
  });
  const [bankAccountInput, setBankAccountInput] = useState("");
  const [accountName, setAccountName] = useState("");
  const [currency, setCurrency] = useState("");
  const [incomesInput, setIncomesInput] = useState("");

  useEffect(() => {
    if (Number(bankAccountInput) > 0) {
      setBankAccountInputError({ state: false, message: "" });
    }
    if (accountName.length > 0) {
      setErrorAccountName({ state: false, message: "" });
    }
    if (currency.length > 0) {
      setErrorCurrency({ state: false, message: "" });
    }
    if (Number(incomesInput) >= 0) {
      setIncomesInputError({ state: false, message: "" });
    }
  }, [accountName, bankAccountInput, currency, incomesInput]);

  const submitCheck = () => {
    const bankAccountId = randomId();
    const incomeCatId = randomId();
    const catId = randomId();
    if (
      Number(bankAccountInput) > 0 &&
      accountName.length > 0 &&
      currency.length > 0 &&
      Number(incomesInput) === 0
    ) {
      dispatch(
        addBankAccount({
          accountName: accountName,
          accountId: bankAccountId,
          currency: currency.toUpperCase(),
          bankAccountStatus: Number(bankAccountInput),
        })
      );
      dispatch(
        setPlannedExpensesNewCurrency({ currency: currency.toUpperCase() })
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
      if (monthCategoriesExpensesStore.length > 0) {
        dispatch(
          createNewBankAccountInitialExpensesSetup({
            bankAccountId: bankAccountId,
          })
        );
      }

      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      accountName.length > 0 &&
      currency.length > 0 &&
      Number(incomesInput) > 0 &&
      Number(incomesInput) > Number(bankAccountInput)
    ) {
      const difference = Number(incomesInput) - Number(bankAccountInput) + 1;
      const income = Number(incomesInput);
      dispatch(
        addBankAccount({
          accountName: accountName,
          accountId: bankAccountId,
          currency: currency.toUpperCase(),
          bankAccountStatus: Number(1),
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
      if (monthCategoriesExpensesStore.length > 0) {
        dispatch(
          createNewBankAccountInitialExpensesSetup({
            bankAccountId: bankAccountId,
          })
        );
      }
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
      dispatch(
        setPlannedExpensesNewCurrency({ currency: currency.toUpperCase() })
      );
      dispatch(
        setPlannedExpense({
          name: "Inne",
          iconName: "star",
          catId: catId,
        })
      );
      dispatch(
        addPlannedExpense({
          catId: catId,
          value: difference,
          currency: currency.toUpperCase(),
        })
      );
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      accountName.length > 0 &&
      currency.length > 0 &&
      Number(incomesInput) > 0 &&
      Number(incomesInput) < Number(bankAccountInput)
    ) {
      const difference = Number(bankAccountInput) - Number(incomesInput);
      const income = Number(incomesInput) - 1;
      dispatch(
        addBankAccount({
          accountName: accountName,
          accountId: bankAccountId,
          currency: currency.toUpperCase(),
          bankAccountStatus: difference,
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
      dispatch(
        setPlannedExpensesNewCurrency({ currency: currency.toUpperCase() })
      );
      if (monthCategoriesExpensesStore.length > 0) {
        dispatch(
          createNewBankAccountInitialExpensesSetup({
            bankAccountId: bankAccountId,
          })
        );
        dispatch(
          setPlannedExpensesNewCurrency({ currency: currency.toUpperCase() })
        );
      }
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      accountName.length > 0 &&
      currency.length > 0 &&
      Number(incomesInput) === Number(bankAccountInput)
    ) {
      const income = Number(incomesInput);
      dispatch(
        addBankAccount({
          accountName: accountName,
          accountId: bankAccountId,
          currency: currency.toUpperCase(),
          bankAccountStatus: 1,
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
      dispatch(
        setPlannedExpensesNewCurrency({ currency: currency.toUpperCase() })
      );
      setModalVisible(false);
    }
    if (Number(incomesInput) < 0) {
      setIncomesInputError({
        state: true,
        message: "Kwota przychodów powinna być większa lub równa 0!",
      });
    }
    if (Number(bankAccountInput) < 1) {
      setBankAccountInputError({
        state: true,
        message: "Stan konta powinien być większy lub równy 1!",
      });
    } else if (Number(bankAccountInput) <= 0) {
      setBankAccountInputError({
        state: true,
        message: "Kwota rachunku musi być większa od 0 !",
      });
    } else if (accountName.length === 0) {
      setErrorAccountName({
        state: true,
        message: "Nazwa rachunku nie może być pusta !",
      });
    } else if (currency.length === 0) {
      setErrorCurrency({
        state: true,
        message: "Nazwa waluty nie może być pusta !",
      });
    } else if (Number(incomesInput) < 0) {
      setIncomesInputError({
        message: "Kwota powinna być równa 0 lub większa od 0 !",
        state: true,
      });
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
          <Text style={styles.header}>Dodajesz nowy rachunek</Text>
          <Text style={styles.label}>Podaj nazwę rachunku:</Text>
          <TextInput
            style={styles.textInput}
            value={accountName}
            onChangeText={(text) => setAccountName(text)}
            keyboardType="default"
            placeholder="Rachunek 2"
            maxLength={20}
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {errorAccountName.state && (
            <Text style={styles.error}>{errorAccountName.message}</Text>
          )}
          <Text style={styles.label}>
            Podaj stan rachunku na dzień dzisiejszy:
          </Text>
          <TextInput
            style={styles.textInput}
            value={bankAccountInput}
            onChangeText={(text) => setBankAccountInput(text)}
            keyboardType="numeric"
            placeholder="12 000"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {incomesInputError.state && (
            <Text style={styles.error}>{incomesInputError.message}</Text>
          )}
          <Text style={styles.label}>
            Podaj kwotę przychodów uzyskanych w tym miesiącu
          </Text>
          <TextInput
            style={styles.textInput}
            value={incomesInput}
            onChangeText={(text) => setIncomesInput(text)}
            keyboardType="numeric"
            placeholder="12 000"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          <Text style={styles.modalInfo}>
            Jeżeli nie uzyskałeś jeszcze przychodów w tym miesiącu wpisz 0. Po
            ich otrzymaniu wprowadź kwotę w zakładce "Przychody".
          </Text>
          {bankAccountInputError.state && (
            <Text style={styles.error}>{bankAccountInputError.message}</Text>
          )}
          <Text style={styles.label}>Podaj walutę:</Text>
          <TextInput
            style={styles.textInput}
            value={currency}
            onChangeText={(text) => setCurrency(text)}
            keyboardType="default"
            placeholder="PLN"
            maxLength={5}
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {errorCurrency.state && (
            <Text style={styles.error}>{errorCurrency.message}</Text>
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
    color: "white",
    fontSize: 14,
    textAlign: "left",
    width: "100%",
  },
  header: {
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
  modalInfo: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS_STYLE.basicGold,
  },
});

export default ModalAddBankAccount;
