import { Text, View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import PieChart from "react-native-pie-chart";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import CustomModal from "../../components/piggyBank/savings/CustomModal";
import MonthsSavingsBox from "../../components/piggyBank/savings/MonthsSavingsBox";
import RealisedTargetsBox from "../../components/piggyBank/savings/RealisedTargetsBox";
import Label from "../../utils/ui/Label";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";

const SavingsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const bankAccountsStore = useAppSelector(
    (state) => state.bankAccounts.accounts
  );
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const realisedTargets = useAppSelector(
    (state) => state.piggyBank.realisedTargets
  );

  const bankAccountStatus = bankAccountsStore.filter(
    (item) => item.accountId === activeBankAccountStore.accountId
  )[0].bankAccountStatus;

  const monthIncomesActiveAccountIndex = monthIncomes.findIndex(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );

  const currentBankAccountInStoreIndex = bankAccountsStore.findIndex(
    (item) => item.accountId === activeBankAccountStore.accountId
  );

  const yearSavings =
    bankAccountsStore[currentBankAccountInStoreIndex].yearSavings;

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

  if (monthIncomesActiveAccountIndex !== -1 && categoriesExpenses.length > 0) {
    monthIncomesSum =
      monthIncomesActiveAccountIndex !== -1
        ? monthIncomes[monthIncomesActiveAccountIndex].categories
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
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes - monthExpensesSum;
  } else if (monthIncomesActiveAccountIndex !== -1) {
    monthIncomesSum =
      monthIncomesActiveAccountIndex !== -1
        ? monthIncomes[monthIncomesActiveAccountIndex].categories
            .map((item) => Number(item.value))
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
    bankAccountPlusIncomes = bankAccountStatus;
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes;
  } else {
    totalBankAccount = bankAccountStatus;
  }

  const targetsIncomesArray = finantialTargets.map((item) =>
    item.incomes.map((value) =>
      value.bankAccountId === activeBankAccountStore.accountId
        ? Number(value.value)
        : 0
    )
  );

  const sumOfFinantialIncomes = targetsIncomesArray
    .flat(1)
    .reduce((partialSum, a) => partialSum + a, 0);
  const [modalVisible, setModalVisible] = useState(true);
  const freeSavings = totalBankAccount - sumOfFinantialIncomes;
  const pieChartOneData = [
    sumOfFinantialIncomes !== 0
      ? Number(((sumOfFinantialIncomes / totalBankAccount) * 100).toFixed(2))
      : 1,
    100 -
      Number(((sumOfFinantialIncomes / totalBankAccount) * 100).toFixed(2)) <
    0
      ? 0
      : 100 -
        Number(((sumOfFinantialIncomes / totalBankAccount) * 100).toFixed(2)),
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        {bankAccountStatus === 0 && (
          <UpdateBankAccountInfo onPress={() => setModalVisible(true)} />
        )}

        {bankAccountStatus > 0 && (
          <>
            <GoldenFrame
              name="STAN KONTA"
              value={Number(totalBankAccount.toFixed(2))}
            />
            <Text style={styles.label}> Udziały w oszczędnościach</Text>
            <View style={styles.greyBoxContainer}>
              {totalBankAccount > 0 && (
                <PieChart
                  widthAndHeight={120}
                  series={pieChartOneData}
                  sliceColor={[COLORS_STYLE.basicGold, COLORS_STYLE.green]}
                  coverRadius={0.65}
                  coverFill={COLORS_STYLE.backgroundBlack}
                />
              )}
              <View style={styles.greyBoxDetails}>
                <Text style={styles.greyBoxLabel}>Wolne oszczędności</Text>
                <Text style={styles.greyBoxGreenText}>
                  {numberWithSpaces(Number(freeSavings.toFixed(2)))}{" "}
                  {activeBankAccountStore.currency}
                </Text>
                <Text style={styles.greyBoxLabel}>Cele finansowe</Text>
                <Text style={styles.greyBoxGoldText}>
                  {numberWithSpaces(sumOfFinantialIncomes)}{" "}
                  {activeBankAccountStore.currency}
                </Text>
              </View>
            </View>
            <Label value="Zestawienie oszczędności" />
            <MonthsSavingsBox
              realised={yearSavings.length > 0 ? true : false}
              onPress={() => navigation.navigate("monthsSavings")}
            />
          </>
        )}
        {realisedTargets.length > 0 && (
          <>
            <Label value="Zrealizowane cele finansowe" />
            <RealisedTargetsBox
              realised={realisedTargets.length > 0 ? true : false}
              onPress={() => {
                realisedTargets.length > 0
                  ? navigation.navigate("realisedTargets")
                  : navigation.navigate("planning");
              }}
            />
          </>
        )}

        {bankAccountStatus === 0 && (
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={(value) => setModalVisible(value)}
          />
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
  text: {
    color: "white",
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
  greyBoxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 20,
    borderRadius: 15,
  },
  greyBoxDetails: {
    width: "50%",
  },
  greyBoxLabel: {
    color: "white",
    fontSize: 16,
  },
  greyBoxGoldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 16,
    marginTop: 5,
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
  },
  greyBoxGreenText: {
    color: COLORS_STYLE.green,
    fontSize: 20,
    marginTop: 5,
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: COLORS_STYLE.green,
  },
});
export default SavingsScreen;
