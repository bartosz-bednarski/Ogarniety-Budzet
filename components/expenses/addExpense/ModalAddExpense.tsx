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
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const finantialTargetsStore = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );

  const [error, setError] = useState({ state: false, message: "" });

  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStoreId
  );
  const monthIncomesActiveBankAccountIdIndex = monthIncomes.findIndex(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );

  let monthIncomesSum;
  let bankAccountPlusIncomes;
  let monthExpensesSum;
  let totalBankAccount: number;
  let sumOfFinantialTargets;

  if (finantialTargetsStore !== undefined) {
    if (finantialTargetsStore.length > 0) {
      const finantialTargetsActiveAccount: { value: number }[] = [];
      for (let i = 0; i < finantialTargetsStore.length; i++) {
        for (let x = 0; x < finantialTargetsStore[i].incomes.length; x++) {
          if (
            finantialTargetsStore[i].incomes[x].bankAccountId ===
            activeBankAccountStoreId
          ) {
            finantialTargetsActiveAccount.push({
              value: finantialTargetsStore[i].incomes[x].value,
            });
          }
        }
      }

      if (finantialTargetsActiveAccount.length > 0) {
        sumOfFinantialTargets = finantialTargetsActiveAccount
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0);
      } else {
        sumOfFinantialTargets = 0;
      }
    } else {
      sumOfFinantialTargets = 0;
    }
  } else {
    sumOfFinantialTargets = 0;
  }

  if (monthIncomes.length > 0 && categoriesExpenses.length > 0) {
    monthIncomesSum =
      monthIncomesActiveBankAccountIdIndex !== -1
        ? monthIncomes[monthIncomesActiveBankAccountIdIndex].categories
            .map((item) => Number(item.value))
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
    const monthExpensesActiveBankAccountIdIndex = categoriesExpenses.findIndex(
      (item) => item.bankAccountId === activeBankAccountStore.accountId
    );
    monthExpensesSum =
      monthExpensesActiveBankAccountIdIndex !== -1
        ? categoriesExpenses[monthExpensesActiveBankAccountIdIndex].categories
            .map((item) => Number(item.sum))
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
    bankAccountPlusIncomes =
      Number(monthIncomesSum) +
      Number(bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus);
    totalBankAccount =
      bankAccountPlusIncomes - monthExpensesSum - sumOfFinantialTargets;
  } else if (monthIncomes.length > 0) {
    monthIncomesSum = monthIncomes[
      monthIncomesActiveBankAccountIdIndex
    ].categories
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes =
      bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus;
    bankAccountPlusIncomes =
      Number(monthIncomesSum) +
      Number(bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes - sumOfFinantialTargets;
  } else {
    totalBankAccount =
      bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus -
      sumOfFinantialTargets;
  }

  const submitCheck = () => {
    if (value !== "" && isNaN(Number(value)) === false) {
      if (Number(value) < totalBankAccount) {
        submitHandler();
        setError({ state: false, message: "" });
      } else {
        setError({ state: true, message: "Nie masz tyle środków na koncie!" });
      }
    } else if (Number(value) <= 0) {
      setError({
        state: true,
        message: "Wprowadzona kwota musi być większa od 0!",
      });
    } else {
      setError({
        state: true,
        message: "Wprowadzona wartość nie jest liczbą!",
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
          <Text style={styles.label}>Dodajesz nowy wydatek</Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
            placeholder="Podaj kwotę"
            placeholderTextColor={COLORS_STYLE.labelGrey}
            autoFocus={true}
          />
          {error.state && (
            <>
              <Text style={styles.error}>{error.message}</Text>
              {error.message === "Nie masz tyle środków na koncie!" && (
                <Text style={styles.error}>
                  Dostępne środki: {(totalBankAccount - 1).toFixed(2)}{" "}
                  {activeBankAccountStore.currency}
                </Text>
              )}
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
    marginVertical: 10,
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
  },
  modalButtonsBox: {
    marginTop: 10,
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
