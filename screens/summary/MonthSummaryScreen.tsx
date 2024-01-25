import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import GrayBox from "../../components/expenses/GrayBox";
import { useAppSelector } from "../../redux/hooks";
import PieChart from "react-native-pie-chart";
import GoldenFrame from "../../utils/ui/GoldenFrame";
const MonthSummaryScreen = () => {
  const expenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const incomes = useAppSelector((state) => state.incomes.categoriesIncomes);
  const sumOfExpenses = expenses
    .map((item) => Number(item.sum))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfIncomes = incomes
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const pieChartData = [
    sumOfIncomes !== 0
      ? Number(((sumOfExpenses / sumOfIncomes) * 100).toFixed(2))
      : 1,
    100 - Number(((sumOfExpenses / sumOfIncomes) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((sumOfExpenses / sumOfIncomes) * 100).toFixed(2)),
  ];
  const moneyLeft = sumOfIncomes - sumOfExpenses;
  return (
    <View style={styles.container}>
      <View style={styles.rowBox}>
        <GrayBox name="Przychody" value={sumOfIncomes} />
        <GrayBox name="Wydatki" value={sumOfExpenses} />
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
      <GoldenFrame name="ZOSTAŁO" value={moneyLeft} />
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
export default MonthSummaryScreen;
