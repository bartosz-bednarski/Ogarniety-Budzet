import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import GrayBox50 from "../../utils/ui/GrayBox50";
import { useAppSelector } from "../../redux/hooks";
import PieChart from "react-native-pie-chart";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import GrayBox100 from "../../utils/ui/GrayBox100";
const MonthSummaryScreen = () => {
  const dateCheck = "2027-05-26T08:06:22.626Z";
  const expenses = useAppSelector((state) => state.expenses.monthExpenses);
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const incomes = useAppSelector((state) => state.incomes.categoriesIncomes);

  const moneyleftFilterMonths = finantialTargets.map((item) => {
    return item.incomes.filter(
      (t) => t.dateMonth === new Date(dateCheck).getMonth()
    );
  });
  const moneyLeftValues = moneyleftFilterMonths.map((item) =>
    item.filter((k) => k.dateMonth === 4).map((i) => i.value)
  );
  const targetsArr = [];
  for (let i = 0; i < moneyLeftValues.length; i++) {
    targetsArr.push(...moneyLeftValues[i]);
  }
  const finantialTargetsSum = targetsArr.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const expensesValues = expenses.map((i) => Number(i.value));
  console.log(expensesValues);
  const sumOfExpenses = expensesValues.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  console.log(sumOfExpenses);
  const sumOfIncomes = incomes
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const pieChartData = [
    sumOfIncomes !== 0
      ? Number(
          (
            ((sumOfExpenses + finantialTargetsSum) / sumOfIncomes) *
            100
          ).toFixed(2)
        )
      : 1,
    100 -
      Number(
        (((sumOfExpenses + finantialTargetsSum) / sumOfIncomes) * 100).toFixed(
          2
        )
      ) <
    0
      ? 0
      : 100 -
        Number(
          (
            ((sumOfExpenses + finantialTargetsSum) / sumOfIncomes) *
            100
          ).toFixed(2)
        ),
  ];
  const moneyLeft = sumOfIncomes - sumOfExpenses - finantialTargetsSum;
  return (
    <View style={styles.container}>
      <GrayBox100 name="Oszczędzono" value={sumOfIncomes - sumOfExpenses} />
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
      <GoldenFrame name="ZOSTAŁO" value={moneyLeft} />
      <View style={styles.rowBox}>
        <GrayBox50 name="Przychody" value={sumOfIncomes} />
        <GrayBox50 name="Wydatki" value={sumOfExpenses} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: COLORS_STYLE.backgroundBlack,
    alignItems: "center",
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
export default MonthSummaryScreen;
