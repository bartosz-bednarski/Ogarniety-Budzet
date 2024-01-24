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
import StripsColumn from "../../expenses/StripsColumn";
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
  // console.log(yearIncomes.categoriesIncomes);
  // const legend = yearIncomes.categoriesIncomes.map((item, index) => {
  //   if (item.stillExsists) {
  //     const filteredCategories = incomesCategories.find(
  //       (category) => category.catId === item.catId
  //     );
  //     return {
  //       ...filteredCategories,
  //       value: item.value,
  //       color: pieChartColors[index],
  //     };
  //   } else if (!item.stillExsists) {
  //     return {
  //       name: "Inne",
  //       iconName: "star",
  //       color: pieChartColors[index],
  //       value: item.value,
  //     };
  //   }
  // });
  // console.log(legend);
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
              coverRadius={0.45}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
          </View>
          <Text style={styles.value}>
            {numberWithSpaces(yearIncomes.sumOfAllIncomes)} PLN
          </Text>
        </View>
        <View style={styles.dropdownButton}>
          <Ionicons
            name={showDropdown ? "caret-up" : "caret-down"}
            color={COLORS_STYLE.basicGold}
            size={20}
          />
        </View>
        {showDropdown && <StripsColumn data={stripsColumnsData} />}
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
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 15,
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
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
  },
  chartBox: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButton: {
    marginVertical: 5,
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    width: "60%",
    fontSize: 30,
    textAlign: "center",
    color: COLORS_STYLE.basicGold,
  },
  legendBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  legendItem: {
    flexDirection: "row",
    gap: 4,
  },
});
export default YearIncomesBox;
