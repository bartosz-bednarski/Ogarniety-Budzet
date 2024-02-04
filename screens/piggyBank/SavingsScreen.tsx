import { Text, View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppSelector } from "../../redux/hooks";
import CustomButton from "../../utils/ui/CustomButton";
import { useState } from "react";
import PieChart from "react-native-pie-chart";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

import CustomModal from "../../components/piggyBank/savings/CustomModal";
import MonthsSavingsBox from "../../components/piggyBank/savings/MonthsSavingsBox";
import RealisedTargetsBox from "../../components/piggyBank/savings/RealisedTargetsBox";
const SavingsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
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
  const yearSavings = useAppSelector((state) => state.piggyBank.yearSavings);
  const monthsSavings = yearSavings.slice(0, 3);
  let monthIncomesSum;
  let bankAccountPlusIncomes;
  let monthExpensesSum;
  let totalBankAccount;
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

  const targetsIncomesArray = finantialTargets.map((item) =>
    item.incomes.map((value) => value.value)
  );

  const sumOfFinantialIncomes = targetsIncomesArray
    .flat(1)
    .reduce((partialSum, a) => partialSum + a, 0);
  const [modalVisible, setModalVisible] = useState(false);
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
          <View style={styles.buttonBox}>
            <CustomButton
              title="Uzupełnij stan konta"
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}

        {bankAccountStatus > 0 && (
          <>
            <GoldenFrame name="STAN KONTA" value={totalBankAccount} />
            <Text style={styles.label}> Udziały w oszczędnościach</Text>
            <View style={styles.greyBoxContainer}>
              <PieChart
                widthAndHeight={120}
                series={pieChartOneData}
                sliceColor={[COLORS_STYLE.basicGold, COLORS_STYLE.green]}
                coverRadius={0.65}
                coverFill={COLORS_STYLE.backgroundBlack}
              />
              <View style={styles.greyBoxDetails}>
                <Text style={styles.greyBoxLabel}>Wolne oszczędności</Text>
                <Text style={styles.greyBoxGreenText}>
                  {numberWithSpaces(freeSavings)} PLN
                </Text>
                <Text style={styles.greyBoxLabel}>Cele finansowe</Text>
                <Text style={styles.greyBoxGoldText}>
                  {numberWithSpaces(sumOfFinantialIncomes)} PLN
                </Text>
              </View>
            </View>
          </>
        )}
        {yearSavings.length > 0 && (
          <>
            <Text style={styles.label}>
              Oszczędności w poszczególnych miesiącach
            </Text>
            <MonthsSavingsBox
              yearSavings={monthsSavings}
              onPress={() => navigation.navigate("monthsSavings")}
            />
            {realisedTargets.length > 0 && (
              <>
                <Text style={styles.label}>Zrealizowane cele finansowe</Text>
                <RealisedTargetsBox
                  realisedTargets={realisedTargets.slice(0, 3)}
                  onPress={() => navigation.navigate("realisedTargets")}
                />
              </>
            )}
          </>
        )}

        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={(value) => setModalVisible(value)}
        />
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
