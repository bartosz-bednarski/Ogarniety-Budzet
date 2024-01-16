import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../../utils/ui/CustomButton";
import { useState } from "react";
import PieChart from "react-native-pie-chart";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

import CustomModal from "../../components/piggyBank/savings/CustomModal";
const SavingsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const categoriesIncomes = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const yearSavings = useAppSelector((state) => state.piggyBank.yearSavings);
  let monthIncomesSum;
  let bankAccountPlusIncomes;
  let monthExpensesSum;
  let totalBankAccount;
  if (monthIncomes.length > 0 && categoriesExpenses.length > 0) {
    monthIncomesSum = monthIncomes
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    monthExpensesSum = categoriesExpenses
      .map((item) => Number(item.sum))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes - monthExpensesSum;
  } else if (monthIncomes.length > 0) {
    monthIncomesSum = monthIncomes
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes = bankAccountStatus;
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes;
  } else {
    totalBankAccount = bankAccountStatus;
  }
  const [modalVisible, setModalVisible] = useState(false);

  console.log(bankAccountStatus);
  return (
    <View style={styles.container}>
      {categoriesIncomes.length === 0 && (
        <View style={styles.buttonBox}>
          <CustomButton
            title="Dodaj kategorie przychodów"
            onPress={() =>
              navigation.navigate("settingsNavigator", {
                screen: "addNewIncomesCategory",
              })
            }
          />
        </View>
      )}
      {bankAccountStatus === 0 && categoriesIncomes.length > 0 && (
        <View style={styles.buttonBox}>
          <CustomButton
            title="Uzupełnij stan konta"
            onPress={() => setModalVisible(true)}
          />
        </View>
      )}
      {bankAccountStatus > 0 && (
        <GoldenFrame name="STAN KONTA" value={totalBankAccount} />
      )}

      {bankAccountStatus > 0 && (
        <>
          <Text style={styles.label}> Udziały w oszczędnościach</Text>
          <View style={styles.greyBoxContainer}>
            <PieChart
              widthAndHeight={120}
              series={[totalBankAccount]}
              sliceColor={[COLORS_STYLE.basicGold]}
              coverRadius={0.65}
              coverFill={COLORS_STYLE.tabGrey}
            />
            <View style={styles.greyBoxDetails}>
              <Text style={styles.greyBoxLabel}>Wolne oszczędności</Text>
              <Text style={styles.greyBoxGoldText}>
                {numberWithSpaces(totalBankAccount)} PLN
              </Text>
              <Text style={styles.greyBoxLabel}>Cele finnsowe</Text>
              <Text style={styles.greyBoxYellowText}>2 000 PLN</Text>
            </View>
          </View>
        </>
      )}
      <Text style={styles.label}>Oszczędności w poszczególnych miesiącach</Text>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={(value) => setModalVisible(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    backgroundColor: COLORS_STYLE.tabGrey,
    flexDirection: "row",
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
    fontSize: 12,
  },
  greyBoxGoldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
  greyBoxYellowText: {
    color: "yellow",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default SavingsScreen;
