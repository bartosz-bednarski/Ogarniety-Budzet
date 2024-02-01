import { Text, View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import PieChart from "react-native-pie-chart";
import GrayBox50 from "../../utils/ui/GrayBox50";
import GrayBox100 from "../../utils/ui/GrayBox100";
import pieChartColors from "../../utils/styles/pieChartColors";
import YearsSummaryBox from "../../components/summary/YearsSummaryBox";
const YearsSummaryScreen = () => {
  const yearsExpenses = useAppSelector((state) => state.expenses.yearsExpenses);
  const yearsIncomes = useAppSelector((state) => state.incomes.yearsIncomes);
  const yearsSavings = useAppSelector((state) => state.piggyBank.yearsSavings);
  const sumOfAllIncomes = yearsIncomes
    .map((item) => item.sumOfAllIncomes)
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllExpenses = yearsExpenses
    .map((item) => item.sumOfAllExpenses)
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllSavings = yearsSavings
    .map((item) => item.sumOfSavings)
    .reduce((partialSum, a) => partialSum + a, 0);
  const pieChartData = [
    sumOfAllIncomes !== 0
      ? Number(((sumOfAllExpenses / sumOfAllIncomes) * 100).toFixed(2))
      : 1,
    100 - Number(((sumOfAllExpenses / sumOfAllIncomes) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((sumOfAllExpenses / sumOfAllIncomes) * 100).toFixed(2)),
  ];
  const grayBoxData = yearsExpenses.map((item) => ({
    year: item.year,
    expenses: item.sumOfAllExpenses,
    incomes:
      yearsIncomes[yearsIncomes.findIndex((k) => k.year === item.year)]
        .sumOfAllIncomes,
    savings:
      yearsSavings[yearsSavings.findIndex((k) => k.year === item.year)]
        .sumOfSavings,
  }));
  console.log("expense", yearsExpenses);
  console.log("incomes", yearsIncomes);
  console.log("savings", yearsSavings);
  console.log(grayBoxData);
  return (
    <ScrollView style={styles.container}>
      {yearsIncomes.length === 0 && (
        <View style={styles.informationBox}>
          <Text style={styles.informationText}>
            Tutaj wyświetlane będą informacje o przychodach z poszczególnych lat
          </Text>
        </View>
      )}
      {yearsIncomes.length > 0 && (
        <>
          <GrayBox100 name="Oszczędzono" value={sumOfAllSavings} />
          <View style={styles.pieChart}>
            <PieChart
              widthAndHeight={200}
              series={pieChartData}
              sliceColor={["red", "green"]}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
          </View>
          <View style={styles.rowBox}>
            <GrayBox50 name="Przychody" value={sumOfAllIncomes} />
            <GrayBox50 name="Wydatki" value={sumOfAllExpenses} />
          </View>
          {grayBoxData.map((item) => (
            <YearsSummaryBox data={item} key={item.year} />
          ))}

          {/* <View style={styles.monthIncomesBox}>
            {yearsIncomes.map((year) => (
              <YearIncomesBox yearIncomes={year} key={year.year} />
            ))}
          </View> */}
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  informationText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
  },
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
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
  monthIncomesBox: {
    gap: 15,
  },
});
export default YearsSummaryScreen;
