import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { useEffect, useState } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import { Navigation } from "../../types/global";
import { MONTHS } from "../../utils/months";
import MonthExpensesBox from "../../components/expenses/yearExpenses/MonthExpensesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";
MONTHS;
// import PieChartComponent from "../components/PieChartComponent";

const YearExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const yearExpenses = useAppSelector((state) => state.expenses.yearExpenses);
  // console.log("#########################", yearExpenses);
  const sumOfAllExpenses = yearExpenses
    .map((item) => Number(item.sumOfAllExpenses))
    .reduce((partialSum, a) => partialSum + a, 0);
  // console.log(yearExpenses);
  return (
    <ScrollView style={styles.container}>
      {yearExpenses.length === 0 && (
        <View style={styles.informationBox}>
          <Text style={styles.informationText}>
            Tutaj wyświetlane będą informacje o przychodach z poszczególnych
            miesięcy
          </Text>
        </View>
      )}
      {yearExpenses.length > 0 && (
        <>
          <GoldenFrame name="SUMA" value={sumOfAllExpenses} />
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={yearExpenses.map((item) => item.sumOfAllExpenses)}
              sliceColor={pieChartColors.slice(0, yearExpenses.length)}
              coverRadius={0.45}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearExpenses.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }} key={item.month}>
                  {MONTHS[item.month]}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearExpenses.map((month) => (
              <MonthExpensesBox monthExpenses={month} key={month.month} />
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
export default YearExpensesScreen;
