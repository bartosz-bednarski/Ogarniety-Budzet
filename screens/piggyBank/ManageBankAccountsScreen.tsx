import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import BankAccountGrayBox from "../../components/piggyBank/manageBankAccounts/BankAccountGrayBox";
import AddBankAccountBox from "../../components/piggyBank/manageBankAccounts/AddBankAccountBox";
import { useState } from "react";
import ModalAddBankAccount from "../../components/piggyBank/manageBankAccounts/ModalAddBankAccount";
import { useAppSelector } from "../../redux/hooks";
const ManageBankAccountsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const bankAccountsStore = useAppSelector(
    (state) => state.bankAccounts.accounts
  );
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const incomes = useAppSelector((state) => state.incomes.categoriesIncomes);
  const bankAccounts = bankAccountsStore.filter(
    (item) => item.status === "OPEN"
  );
  return (
    <View style={styles.container}>
      {bankAccounts.map((item, index) => {
        const incomesAccountIdIndex = incomes.findIndex(
          (income) => income.bankAccountId === item.accountId
        );
        const monthIncomesSum =
          incomesAccountIdIndex !== -1
            ? incomes[incomesAccountIdIndex].categories
                .map((item) => Number(item.value))
                .reduce((partialSum, a) => partialSum + a, 0)
            : 0;
        const categoriesExpensesAccountIdIndex = categoriesExpenses.findIndex(
          (catExp) => catExp.bankAccountId === item.accountId
        );
        const monthExpensesSum =
          categoriesExpensesAccountIdIndex !== -1
            ? categoriesExpenses[categoriesExpensesAccountIdIndex].categories
                .map((item) => Number(item.sum))
                .reduce((partialSum, a) => partialSum + a, 0)
            : 0;

        console.log(
          "incomesSum",
          monthIncomesSum,
          "expensesSum",
          monthExpensesSum
        );
        return (
          <BankAccountGrayBox
            key={item.accountId}
            accountName={item.accountName}
            accountValue={
              Number(item.bankAccountStatus) +
              Number(monthIncomesSum) -
              Number(monthExpensesSum)
            }
            accountId={item.accountId}
            accountCurrency={item.currency}
          />
        );
      })}

      <AddBankAccountBox onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <ModalAddBankAccount
          modalVisible={modalVisible}
          setModalVisible={(value) => setModalVisible(value)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
    gap: 20,
  },
});
export default ManageBankAccountsScreen;
