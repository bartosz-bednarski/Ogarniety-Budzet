import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { useEffect, useState } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import { Navigation } from "../../types/global";
import { MONTHS } from "../../utils/months";
import MonthExpensesBox from "../../components/expenses/yearExpenses/MonthExpensesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";
MONTHS;

const YearExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dateCheck = "2024-06-12T08:06:22.626Z";

  const monthExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );

  console.log(monthExpenses);
  const yearExpenses = useAppSelector((state) => state.expenses.yearExpenses);
  const sumOfYearExpenses = yearExpenses
    .map((item) => Number(item.sumOfAllExpenses))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfMonthExpenses = monthExpenses
    .map((item) => Number(item.sum))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllExpenses = sumOfYearExpenses + sumOfMonthExpenses;
  const currentMonthExpensesBoxData = {
    // month: new Date().getMonth(),
    month: new Date(dateCheck).getMonth(),
    sumOfAllExpenses: sumOfMonthExpenses,
    categoriesExpenses: monthExpenses.map((item) => ({
      catId: item.catId,
      sum: item.sum,
      stillExsists: true,
    })),
  };
  console.log("!!!!!!!!!!!", currentMonthExpensesBoxData);
  // console.log(yearExpenses);
  return (
    <ScrollView style={styles.container}>
      {yearExpenses.length === 0 && (
        <View style={styles.informationBox}>
          <Text style={styles.informationText}>
            Tutaj wyświetlane będą informacje o wydatkach z poszczególnych
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
              series={[
                ...yearExpenses.map((item) => item.sumOfAllExpenses),
                sumOfMonthExpenses === 0 ? 1 : sumOfMonthExpenses,
              ]}
              sliceColor={pieChartColors.slice(0, yearExpenses.length + 1)}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearExpenses.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }} key={item.month}>
                  {MONTHS[item.month]}
                </Text>
              ))}
              <Text style={{ color: pieChartColors[yearExpenses.length] }}>
                {/* {MONTHS[new Date().getMonth()]} */}
                {MONTHS[new Date(dateCheck).getMonth()]}
              </Text>
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearExpenses.map((month) => (
              <MonthExpensesBox monthExpenses={month} key={month.month} />
            ))}
            <MonthExpensesBox monthExpenses={currentMonthExpensesBoxData} />
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
