import { StyleSheet, Text, View, Pressable } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import {
  MonthIncomesBoxProps,
  YearIncomesBoxProps,
} from "../../../types/incomes";
import { MONTHS } from "../../../utils/months";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../../utils/styles/pieChartColors";
import { useAppSelector } from "../../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import StripsColumn from "../../../utils/ui/StripsColumn";
const YearIncomesBox: React.FC<{ yearIncomes: YearIncomesBoxProps }> = ({
  yearIncomes,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const stripsColumnsData: any[] = yearIncomes.months.map((item) => ({
    catId: item.month,
    iconName: "calendar-outline",
    name: MONTHS[item.month],
    value: yearIncomes.sumOfAllIncomes,
    sum: item.sumOfAllIncomes,
  }));
  return (
    <View style={styles.container}>
      <Text style={styles.monthName}>{yearIncomes.year}</Text>
      <Pressable
        style={styles.box}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.mainBox}>
          <View style={styles.chartBox}>
            <PieChart
              widthAndHeight={120}
              series={yearIncomes.months.map((month) =>
                month.sumOfAllIncomes === 0 ? 1 : month.sumOfAllIncomes
              )}
              sliceColor={pieChartColors.slice(0, yearIncomes.months.length)}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.tabGrey}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.textWhiteBig}>SUMA</Text>
            <Text style={styles.value}>
              {numberWithSpaces(yearIncomes.sumOfAllIncomes)} PLN
            </Text>
          </View>
          <View style={styles.calendarBox}>
            <Ionicons name="calendar-outline" color={"white"} size={24} />
          </View>
        </View>

        {showDropdown && <StripsColumn data={stripsColumnsData} />}
        <View style={styles.dropdownButton}>
          <Ionicons
            name={showDropdown ? "caret-up" : "caret-down"}
            color={COLORS_STYLE.tabGrey}
            size={20}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
  },
  box: {
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 15,
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
  },
  monthName: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
  mainBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    width: "100%",
    marginBottom: 5,
  },
  chartBox: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },

  details: {
    width: "45%",
  },
  calendarBox: {
    width: "20%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 5,
  },
  textWhiteBig: {
    width: "100%",
    fontSize: 26,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  value: {
    width: "100%",
    fontSize: 26,
    textAlign: "center",
    fontWeight: "600",
    color: COLORS_STYLE.basicGold,
  },
  dropdownButton: {
    marginTop: 5,
    marginVertical: 0,
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_STYLE.basicGold,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
  },
});
export default YearIncomesBox;
