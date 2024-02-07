import { Text, View, StyleSheet, ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../utils/styles/pieChartColors";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import YearIncomesBox from "../../components/incomes/yearsIncomes/YearIncomesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";
const YearsIncomesScreen = () => {
  const yearsIncomes = useAppSelector((state) => state.incomes.yearsIncomes);
  const sumOfAllIncomes = yearsIncomes
    .map((item) => Number(item.sumOfAllIncomes))
    .reduce((partialSum, a) => partialSum + a, 0);
  return (
    <ScrollView style={styles.container}>
      {yearsIncomes.length === 0 && (
        <View style={styles.informationBox}>
          <Text style={styles.informationText}>
            Tutaj będą wyświetlane informacje o przychodach z poszczególnych
            lat.
          </Text>
        </View>
      )}
      {yearsIncomes.length > 0 && (
        <>
          <GoldenFrame name="SUMA" value={sumOfAllIncomes} />
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={yearsIncomes.map((item) => item.sumOfAllIncomes)}
              sliceColor={pieChartColors.slice(0, yearsIncomes.length)}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearsIncomes.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }} key={item.year}>
                  {item.year}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearsIncomes.map((year) => (
              <YearIncomesBox yearIncomes={year} key={year.year} />
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
export default YearsIncomesScreen;
