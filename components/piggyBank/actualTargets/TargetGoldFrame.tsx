import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../../utils/styles/colors";
import PieChart from "react-native-pie-chart";
import { FinantialTarget } from "../../../types/piggyBank";
const TargetGoldFrame: React.FC<FinantialTarget> = ({
  name,
  iconName,
  id,
  incomes,
  targetValue,
}) => {
  const sumOfIncomes = incomes
    .map((item) => item.value)
    .reduce((partialSum, a) => partialSum + a, 0);
  const pieChartData = [
    sumOfIncomes !== 0
      ? Number(((sumOfIncomes / targetValue) * 100).toFixed(2))
      : 1,
    100 - Number(((sumOfIncomes / targetValue) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((sumOfIncomes / targetValue) * 100).toFixed(2)),
  ];
  return (
    <View style={styles.goldenContainer}>
      <View style={styles.goldenBox}>
        <View style={styles.goldenBoxTop}>
          <View style={styles.pieChartBox}>
            <PieChart
              widthAndHeight={120}
              series={pieChartData}
              sliceColor={["green", "red"]}
              coverRadius={0.65}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <Ionicons
              name={iconName}
              size={50}
              color={COLORS_STYLE.basicGold}
              style={styles.icon}
            />
          </View>

          <View style={styles.goldenBoxDetails}>
            <Text style={styles.goldenText}>{name}</Text>
            <Text style={styles.percText}>
              {(sumOfIncomes / targetValue) * 100} %
            </Text>
            <Text style={styles.targetText}>
              {sumOfIncomes}/{targetValue} PLN
            </Text>
          </View>
        </View>
        <View style={styles.goldenBoxBottom}>
          <Pressable style={styles.button}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={COLORS_STYLE.basicGold}
            />
            <Text style={styles.buttonText}>Wpłać kwotę</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Ionicons name="cog" size={24} color={COLORS_STYLE.basicGold} />
            <Text style={styles.buttonText}>Edytuj</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  goldenContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  goldenBox: {
    flexDirection: "column",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
  },
  goldenBoxTop: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    minheight: 150,
  },
  pieChartBox: {
    width: 70,
    position: "relative",
    flexDirection: "column",
    gap: 5,
  },
  icon: {
    position: "absolute",
    left: 34,
    top: 30,
  },
  goldenBoxDetails: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    paddingRight: 20,
  },
  goldenText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
    width: "100%",
    fontWeight: "700",
    textAlign: "center",
  },
  percText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  targetText: {
    fontSize: 16,
    color: "white",
  },
  goldenBoxBottom: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    borderTopColor: COLORS_STYLE.basicGold,
    borderTopWidth: 1,
    height: 50,
  },
  button: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 12,
  },
});
export default TargetGoldFrame;
