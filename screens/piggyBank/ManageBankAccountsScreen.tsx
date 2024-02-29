import { View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import BankAccountGrayBox from "../../components/piggyBank/manageBankAccounts/BankAccountGrayBox";
import AddBankAccountBox from "../../components/piggyBank/manageBankAccounts/AddBankAccountBox";
import { useState } from "react";
import ModalAddBankAccount from "../../components/piggyBank/manageBankAccounts/ModalAddBankAccount";
import { useAppSelector } from "../../redux/hooks";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";
import { Navigation } from "../../types/global";

const ManageBankAccountsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
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

  const bankAccountStatus = bankAccountsStore.filter(
    (item) => item.accountId === activeBankAccountStore.accountId
  )[0].bankAccountStatus;

  const bankAccounts = bankAccountsStore.filter(
    (item) => item.status === "OPEN"
  );
  return (
    <View style={styles.container}>
      {bankAccountStatus === 0 && (
        <UpdateBankAccountInfo onPress={() => navigation.navigate("account")} />
      )}
      <ScrollView contentContainerStyle={{ gap: 20 }}>
        {bankAccountStatus > 0 && (
          <>
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
              const categoriesExpensesAccountIdIndex =
                categoriesExpenses.findIndex(
                  (catExp) => catExp.bankAccountId === item.accountId
                );
              const monthExpensesSum =
                categoriesExpensesAccountIdIndex !== -1
                  ? categoriesExpenses[
                      categoriesExpensesAccountIdIndex
                    ].categories
                      .map((item) => Number(item.sum))
                      .reduce((partialSum, a) => partialSum + a, 0)
                  : 0;

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
          </>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
});
export default ManageBankAccountsScreen;
