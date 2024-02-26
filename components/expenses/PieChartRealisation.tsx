import { View, StyleSheet, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import FrameSmall from "../../utils/ui/FrameUnderlineSmall";
import COLORS_STYLE from "../../utils/styles/colors";

const PieChartRealisation: React.FC<{
  realExpenses: number;
  plannedExpenses: number;
}> = ({ realExpenses, plannedExpenses }) => {
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

  const pieChartData = [
    100 - Number(((realExpenses / plannedExpenses) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((realExpenses / plannedExpenses) * 100).toFixed(2)),
    plannedExpenses !== 0
      ? Number(((realExpenses / plannedExpenses) * 100).toFixed(2))
      : 1,
  ];

  return (
    <View style={styles.expensesCategories}>
      <View style={styles.pieChartBox}>
        <PieChart
          widthAndHeight={120}
          series={pieChartData}
          sliceColor={[COLORS_STYLE.green, COLORS_STYLE.red]}
          coverRadius={0.6}
          coverFill={COLORS_STYLE.backgroundBlack}
        />
        <Text style={styles.percentage}>{percentage?.toFixed(0)}%</Text>
      </View>
      <View style={styles.topFramesBox}>
        <FrameSmall
          textUp="ZAPLANOWANO"
          textDown={plannedExpenses}
          mainColor={COLORS_STYLE.green}
        />
        <FrameSmall
          textUp="WYDANO"
          textDown={realExpenses}
          mainColor={COLORS_STYLE.red}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topFramesBox: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
    width: "55%",
  },
  pieChartBox: {
    width: 120,
    height: 120,
    position: "relative",
  },
  percentage: {
    position: "absolute",
    left: 32,
    top: 45,
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    width: 60,
    textAlign: "center",
  },
  expensesCategories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "auto",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
export default PieChartRealisation;
