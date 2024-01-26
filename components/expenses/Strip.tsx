import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import pieChartColors from "../../utils/styles/pieChartColors";
const Strip: React.FC<{
  iconName: string;
  categoryName: string | undefined;
  realExpenses: number;
  plannedExpenses: number | undefined;
  pieChartColorsNum: number;
}> = ({
  iconName,
  categoryName,
  realExpenses,
  plannedExpenses,
  pieChartColorsNum,
}) => {
  console.log(realExpenses, plannedExpenses);
  let percentage;
  if (realExpenses > 0) {
    if (plannedExpenses === 0) {
      percentage = 100;
    } else if (plannedExpenses! > 0) {
      percentage = (realExpenses / plannedExpenses!) * 100;
      if (percentage > 100) {
        percentage = 100;
      }
    }
  } else {
    percentage = 0;
  }

  return (
    <View style={styles.stripContainer}>
      <View style={styles.stripBoxTop}>
        <Text style={styles.name}>{categoryName}</Text>
        <Text style={styles.price}>{realExpenses} PLN</Text>
      </View>
      <View style={styles.stripBoxBottom}>
        <Ionicons
          name={iconName}
          size={24}
          color={pieChartColors[pieChartColorsNum]}
        />
        <View style={styles.tabBarBackground}>
          <View
            style={[
              styles.tabBarFront,
              {
                width: `${percentage!}%`,
                backgroundColor: pieChartColors[pieChartColorsNum],
              },
            ]}
          ></View>
        </View>
        <Text style={styles.percentage}>{percentage!.toFixed(2)}%</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  stripContainer: {
    flexDirection: "column",
    width: "95%",
  },
  stripBoxTop: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 32,
    gap: 10,
  },
  name: {
    color: COLORS_STYLE.labelGrey,
    width: 100,
  },
  price: {
    color: COLORS_STYLE.basicGold,
  },
  stripBoxBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  tabBarBackground: {
    width: "70%",
    backgroundColor: COLORS_STYLE.lightGrey,
    height: 15,
    borderRadius: 10,
  },
  tabBarFront: {
    height: 15,
    borderRadius: 10,
  },
  percentage: {
    color: COLORS_STYLE.labelGrey,
  },
});
export default Strip;
