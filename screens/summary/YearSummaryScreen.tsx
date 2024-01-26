import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import GrayBox50 from "../../utils/ui/GrayBox50";
import PieChart from "react-native-pie-chart";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppSelector } from "../../redux/hooks";
const YearSummaryScreen = () => {
  const incomes = useAppSelector((state) => state.incomes.yearIncomes);
  const expenses = useAppSelector((state) => state.expenses.yearExpenses);
  const sumOfIncomes = incomes
    .map((item) => item.sumOfAllIncomes)
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfExpenses = expenses
    .map((item) => item.sumOfAllExpenses)
    .reduce((partialSum, a) => partialSum + a, 0);
  const bilans = sumOfIncomes - sumOfExpenses;

  const pieChartData = [
    sumOfIncomes !== 0
      ? Number(((sumOfExpenses / sumOfIncomes) * 100).toFixed(2))
      : 1,
    100 - Number(((sumOfExpenses / sumOfIncomes) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((sumOfExpenses / sumOfIncomes) * 100).toFixed(2)),
  ];
  return (
    <View style={styles.container}>
      <View style={styles.rowBox}>
        <GrayBox50 name="Przychody" value={sumOfIncomes} />
        <GrayBox50 name="Wydatki" value={sumOfExpenses} />
      </View>
      <View style={styles.pieChart}>
        <PieChart
          widthAndHeight={200}
          series={pieChartData}
          sliceColor={["red", "green"]}
          coverRadius={0.45}
          coverFill={COLORS_STYLE.backgroundBlack}
        />
      </View>
      <GoldenFrame name="BILANS" value={bilans} />
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
