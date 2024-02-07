import { Text, View, StyleSheet, ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import pieChartColors from "../../utils/styles/pieChartColors";
import { MONTHS } from "../../utils/months";
import MonthIncomesBox from "../../components/incomes/yearIncomes/MonthIncomesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";

const YearIncomesScreen = () => {
  const dateCheck = "2024-06-12T08:06:22.626Z";
  const currentMonthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const yearIncomes = useAppSelector((state) => state.incomes.yearIncomes);
  const sumOfCurrentMonthIncomes = currentMonthIncomes
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfYearIncomes = yearIncomes
    .map((item) => Number(item.sumOfAllIncomes))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllIncomes = sumOfYearIncomes + sumOfCurrentMonthIncomes;
  const currentMonthIncomesBoxData = {
    // month: new Date().getMonth(),
    month: new Date(dateCheck).getMonth(),
    sumOfAllIncomes: sumOfCurrentMonthIncomes,
    categoriesIncomes: currentMonthIncomes.map((item) => ({
      catId: item.catId,
      value: item.value,
      stillExsists: true,
    })),
  };
  return (
    <ScrollView style={styles.container}>
      {yearIncomes.length === 0 && (
        <View style={styles.informationBox}>
          <Text style={styles.informationText}>
            Tutaj wyświetlane będą informacje o przychodach z poszczególnych
            miesięcy
          </Text>
        </View>
      )}
      {yearIncomes.length > 0 && (
        <>
          <GoldenFrame name="SUMA" value={sumOfAllIncomes} />
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={[
                ...yearIncomes.map((item) =>
                  item.sumOfAllIncomes === 0 ? 1 : item.sumOfAllIncomes
                ),
                sumOfCurrentMonthIncomes === 0 ? 1 : sumOfCurrentMonthIncomes,
              ]}
              sliceColor={pieChartColors.slice(0, yearIncomes.length + 1)}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearIncomes.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }} key={item.month}>
                  {MONTHS[item.month]}
                </Text>
              ))}
              <Text style={{ color: pieChartColors[yearIncomes.length] }}>
                {/* {MONTHS[new Date().getMonth()]} */}
                {MONTHS[new Date(dateCheck).getMonth()]}
              </Text>
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearIncomes.map((month) => (
              <MonthIncomesBox monthIncomes={month} key={month.month} />
            ))}
            <MonthIncomesBox monthIncomes={currentMonthIncomesBoxData} />
          </View>
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
  yearChart: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  yearChartLegend: {
    marginVertical: 15,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  monthIncomesBox: {
    gap: 15,
  },
});
export default YearIncomesScreen;
