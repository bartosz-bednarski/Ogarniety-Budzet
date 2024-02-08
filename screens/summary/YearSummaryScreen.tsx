import { Text, View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import GrayBox50 from "../../utils/ui/GrayBox50";
import PieChart from "react-native-pie-chart";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppSelector } from "../../redux/hooks";
import GrayBox100 from "../../utils/ui/GrayBox100";

const YearSummaryScreen = () => {
  const incomes = useAppSelector((state) => state.incomes.yearIncomes);
  const expenses = useAppSelector((state) => state.expenses.yearExpenses);
  const currentMonthExpenses = useAppSelector(
    (state) => state.expenses.monthExpenses
  );
  const currentMonthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const currentMonthExpensesValues = currentMonthExpenses.map((item) =>
    Number(item.value)
  );
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );

  const sumOfCurrentMonthIncomes = currentMonthIncomes
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfCurrentMonthExpenses = currentMonthExpensesValues.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  const sumOfIncomes = incomes
    .map((item) => item.sumOfAllIncomes)
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfExpenses = expenses
    .map((item) => item.sumOfAllExpenses)
    .reduce((partialSum, a) => partialSum + a, 0);
  const finantialTargetsValues = finantialTargets.map((i) =>
    i.incomes.map((k) => k.value)
  );

  const targetsArr = [];

  for (let i = 0; i < finantialTargetsValues.length; i++) {
    targetsArr.push(...finantialTargetsValues[i]);
  }
  const finantialTargetsSum = targetsArr.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  const totalSumOfExpenses = sumOfCurrentMonthExpenses + sumOfExpenses;
  const totalSumOfIncomes = sumOfCurrentMonthIncomes + sumOfIncomes;
  const bilans = totalSumOfIncomes - totalSumOfExpenses - finantialTargetsSum;

  const pieChartData = [
    totalSumOfIncomes !== 0
      ? Number(
          (
            ((totalSumOfExpenses + finantialTargetsSum) / totalSumOfIncomes) *
            100
          ).toFixed(2)
        )
      : 1,
    100 -
      Number(
        (
          ((totalSumOfExpenses + finantialTargetsSum) / totalSumOfIncomes) *
          100
        ).toFixed(2)
      ) <
    0
      ? 0
      : 100 -
        Number(
          (
            ((totalSumOfExpenses + finantialTargetsSum) / totalSumOfIncomes) *
            100
          ).toFixed(2)
        ),
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <GrayBox100
          name="Oszczędzono"
          value={totalSumOfIncomes - totalSumOfExpenses}
        />
        <GrayBox100 name="Cele finansowe" value={finantialTargetsSum} />
        <View style={styles.pieChart}>
          <PieChart
            widthAndHeight={200}
            series={pieChartData}
            sliceColor={["red", "green"]}
            coverRadius={0.6}
            coverFill={COLORS_STYLE.backgroundBlack}
          />
        </View>
        <GoldenFrame name="BILANS" value={bilans} />
        <View style={styles.rowBox}>
          <GrayBox50 name="Przychody" value={totalSumOfIncomes} />
          <GrayBox50 name="Wydatki" value={totalSumOfExpenses} />
        </View>
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
  rowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  pieChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  text: {
    color: "white",
  },
});
export default YearSummaryScreen;
