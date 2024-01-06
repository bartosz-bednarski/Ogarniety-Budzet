import { StyleSheet, Text, View } from "react-native";
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
const YearIncomesBox: React.FC<{ yearIncomes: YearIncomesBoxProps }> = ({
  yearIncomes,
}) => {
  const incomesCategories = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );
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
    <View style={styles.mainContainer}>
      <Text style={styles.monthName}>{yearIncomes.year}</Text>
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
        <View style={styles.detailsBox}>
          <Text style={styles.value}>{yearIncomes.sumOfAllIncomes} PLN</Text>
          <View style={styles.legendBox}>
            {yearIncomes.months.map((item, index) => {
              if (item.sumOfAllIncomes > 1) {
                return (
                  <View style={styles.legendItem} key={item?.month}>
                    <Text style={{ color: pieChartColors[index] }}>
                      {MONTHS[item.month]}
                    </Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    gap: 5,
  },
  monthName: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
  mainBox: {
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 20,
    borderRadius: 15,
  },
  chartBox: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsBox: {
    flexDirection: "column",
    width: "50%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 30,
    textAlign: "center",
    width: "100%",
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
