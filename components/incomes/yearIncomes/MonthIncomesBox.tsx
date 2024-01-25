import { Pressable, StyleSheet, Text, View } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { MonthIncomesBoxProps } from "../../../types/incomes";
import { MONTHS } from "../../../utils/months";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../../utils/styles/pieChartColors";
import { useAppSelector } from "../../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import StripsColumn from "../../expenses/StripsColumn";
import { useState } from "react";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
const MonthIncomesBox: React.FC<{ monthIncomes: MonthIncomesBoxProps }> = ({
  monthIncomes,
}) => {
  const incomesCategories = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );
  const [showDropdown, setShowDropdown] = useState(false);
  // console.log(monthIncomes.categoriesIncomes);
  const legend: any[] =
    // {
    //   catId: string;
    //   iconName: string;
    //   name: string | undefined;
    //   value: number | undefined;
    //   sum: number;
    // }
    monthIncomes.categoriesIncomes.map((item, index) => {
      if (item.stillExsists) {
        const filteredCategories = incomesCategories.find(
          (category) => category.catId === item.catId
        );
        return {
          catId: filteredCategories!.catId,
          iconName: filteredCategories!.iconName,
          name: filteredCategories?.name,
          value: monthIncomes?.sumOfAllIncomes,
          sum: item.value,
          // color: pieChartColors[index],
        };
      } else if (!item.stillExsists) {
        return {
          name: "Inne",
          iconName: "star",
          // color: pieChartColors[index],
          value: monthIncomes.sumOfAllIncomes,
          sum: item.value,
        };
      }
    });
  return (
    <View style={styles.container}>
      <Text style={styles.monthName}>{MONTHS[monthIncomes.month]}</Text>
      <Pressable
        style={styles.box}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.mainBox}>
          <View style={styles.chartBox}>
            <PieChart
              widthAndHeight={120}
              series={monthIncomes.categoriesIncomes.map((category) =>
                category.value === 0 ? 1 : category.value
              )}
              sliceColor={pieChartColors.slice(
                0,
                monthIncomes.categoriesIncomes.length
              )}
              coverRadius={0.45}
              coverFill={COLORS_STYLE.tabGrey}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.textWhiteBig}>SUMA</Text>
            <Text style={styles.value}>
              {numberWithSpaces(monthIncomes.sumOfAllIncomes)} PLN
            </Text>
          </View>
        </View>
        <View style={styles.dropdownButton}>
          <Ionicons
            name={showDropdown ? "caret-up" : "caret-down"}
            color={COLORS_STYLE.basicGold}
            size={20}
          />
        </View>
        {showDropdown && <StripsColumn data={legend} />}
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
  textWhiteBig: {
    width: "100%",
    fontSize: 26,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  details: {
    width: "60%",
  },
  value: {
    width: "100%",
    fontSize: 26,
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
export default MonthIncomesBox;
