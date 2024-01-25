import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import pieChartColors from "../../utils/styles/pieChartColors";
import { MONTHS } from "../../utils/months";
import MonthIncomesBox from "../../components/incomes/yearIncomes/MonthIncomesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";

const YearIncomesScreen = () => {
  const yearIncomes = useAppSelector((state) => state.incomes.yearIncomes);
  const sumOfAllIncomes = yearIncomes
    .map((item) => Number(item.sumOfAllIncomes))
    .reduce((partialSum, a) => partialSum + a, 0);
  // console.log(yearIncomes);
  console.log(
    "66666666666666tututu",
    yearIncomes.map((item) => item.sumOfAllIncomes)
  );
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
              series={yearIncomes.map((item) =>
                item.sumOfAllIncomes === 0 ? 1 : item.sumOfAllIncomes
              )}
              sliceColor={pieChartColors.slice(0, yearIncomes.length)}
              coverRadius={0.45}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearIncomes.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }} key={item.month}>
                  {MONTHS[item.month]}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearIncomes.map((month) => (
              <MonthIncomesBox monthIncomes={month} key={month.month} />
            ))}
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
