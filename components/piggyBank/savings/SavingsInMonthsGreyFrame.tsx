import { View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../../utils/styles/colors";
import React from "react";
import { MonthSavings, YearSavings } from "../../../types/piggyBank";
import { MONTHS } from "../../../utils/months";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
const SavingsInMonthsGreyFrame: React.FC<{ yearSavings: MonthSavings[] }> = ({
  yearSavings,
}) => {
  const reversed = yearSavings.reverse();
  const data = yearSavings.slice(0, 3);
  return (
    <View style={styles.container}>
      {yearSavings.map((item) => (
        <View style={styles.box} key={item.month}>
          <View style={styles.pieChartBox}>
            <PieChart
              widthAndHeight={100}
              series={[item.savings]}
              sliceColor={[COLORS_STYLE.basicGold]}
              coverRadius={0.65}
              coverFill={COLORS_STYLE.tabGrey}
            />
            <Text style={styles.monthName}>{MONTHS[Number(item.month)]}</Text>
          </View>
          <Text style={styles.monthSavings}>
            {numberWithSpaces(item.savings)} PLN
          </Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 20,
    borderRadius: 15,
  },
  box: {
    flexDirection: "column",
    gap: 5,
  },
  pieChartBox: {
    position: "relative",
    width: 100,
  },
  monthName: {
    position: "absolute",
    top: 40,
    left: 21,
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    width: 58,
  },
  monthSavings: {
    color: COLORS_STYLE.basicGold,
    width: 100,
    textAlign: "center",
  },
});
export default SavingsInMonthsGreyFrame;
