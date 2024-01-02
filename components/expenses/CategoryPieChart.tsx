import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { CategoryPieChartProps } from "../../types/expenses";
import { Ionicons } from "@expo/vector-icons";
const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  plannedExpense,
  realExpense,
  iconName,
  name,
}) => {
  console.log(realExpense, plannedExpense);
  const pieChartData = [
    plannedExpense !== 0
      ? Number(((realExpense / plannedExpense) * 100).toFixed(2))
      : 1,
    100 - Number(((realExpense / plannedExpense) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((realExpense / plannedExpense) * 100).toFixed(2)),
  ];
  console.log("check", pieChartData);
  return (
    <View style={styles.container}>
      <View style={styles.pieChartBox}>
        <PieChart
          widthAndHeight={70}
          series={pieChartData}
          sliceColor={["red", "green"]}
          coverRadius={0.6}
          coverFill={COLORS_STYLE.backgroundBlack}
        />
        <Ionicons name={iconName} size={25} color="white" style={styles.icon} />
      </View>
      <Text style={styles.text}>{realExpense} PLN</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 120,
    marginHorizontal: 5,
  },
  pieChartBox: {
    width: 70,
    position: "relative",
    flexDirection: "column",
    gap: 5,
  },
  text: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    left: 23,
    top: 20,
  },
});
export default CategoryPieChart;
