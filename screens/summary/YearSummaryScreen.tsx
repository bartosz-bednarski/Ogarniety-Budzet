import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import GrayBox50 from "../../utils/ui/GrayBox50";
import PieChart from "react-native-pie-chart";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppSelector } from "../../redux/hooks";
import GrayBox100 from "../../utils/ui/GrayBox100";
const YearSummaryScreen = () => {
  const incomes = useAppSelector((state) => state.incomes.yearIncomes);
  const expenses = useAppSelector((state) => state.expenses.yearExpenses);
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
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
  console.log(finantialTargetsSum);
  // const finantialTargetsSum = targetsArr.reduce(
  //   (partialSum, a) => partialSum + a,
  //   0
  // );
  const bilans = sumOfIncomes - sumOfExpenses - finantialTargetsSum;

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

      <GoldenFrame name="STAN KONTA" value={bilans} />
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
