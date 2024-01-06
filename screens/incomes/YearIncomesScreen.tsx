import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import pieChartColors from "../../utils/styles/pieChartColors";
import { MONTHS } from "../../utils/months";
import MonthIncomesBox from "../../components/incomes/yearIncomes/MonthIncomesBox";
const YearIncomesScreen = () => {
  const yearIncomes = useAppSelector((state) => state.incomes.yearIncomes);

  // console.log(yearIncomes);
  return (
    <ScrollView style={styles.container}>
      {yearIncomes.length > 0 && (
        <>
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={yearIncomes.map((item) => item.sumOfAllIncomes)}
              sliceColor={pieChartColors.slice(0, yearIncomes.length)}
              coverRadius={0.45}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearIncomes.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }}>
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

      {/* {yearIncomes.length > 0 &&
        yearIncomes.map((item) => (
          <View style={{ backgroundColor: "red", marginVertical: 30 }}>
            <Text style={styles.text}>{item.month}</Text>
            <Text style={styles.text}>{item.sumOfAllIncomes}</Text>
            <View>
              {item.categoriesIncomes.map((category) => {
                if (category.stillExsists) {
                  return (
                    <>
                      <Text style={styles.text}>{category.catId}</Text>
                      <Text style={styles.text}>{category.value}</Text>
                      <Text style={styles.text}>Istnieje</Text>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Text style={styles.text}>{category.catId}</Text>
                      <Text style={styles.text}>{category.value}</Text>
                      <Text style={styles.text}>Nie istnieje</Text>
                    </>
                  );
                }
              })}
            </View>
          </View>
        ))} */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
