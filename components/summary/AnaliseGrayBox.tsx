import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import PieChart from "react-native-pie-chart";

const AnaliseGrayBox: React.FC<{
  currency: string;
  expenses: number;
  incomes: number;
}> = ({ expenses, incomes, currency }) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxLeft}>
        <PieChart
          widthAndHeight={100}
          series={[incomes > 0 ? incomes : 1, expenses > 0 ? expenses : 1]}
          sliceColor={[COLORS_STYLE.green, COLORS_STYLE.red]}
          coverRadius={0.6}
          coverFill={COLORS_STYLE.tabGrey}
        />
      </View>
      <View style={styles.boxRight}>
        <Text style={[styles.header, { color: COLORS_STYLE.green }]}>
          Suma przychodów
        </Text>
        <View style={styles.boxRow}>
          <Ionicons
            name="trending-up-outline"
            size={20}
            color={COLORS_STYLE.green}
          />
          <Text style={styles.value}>
            {incomes} {currency}
          </Text>
        </View>
        <Text style={[styles.header, { color: COLORS_STYLE.red }]}>
          Suma wydatków
        </Text>
        <View style={styles.boxRow}>
          <Ionicons
            name="trending-down-outline"
            size={20}
            color={COLORS_STYLE.red}
          />
          <Text style={styles.value}>
            {expenses} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 0,
    borderRadius: 15,
    minHeight: 100,
  },
  boxLeft: {
    width: "40%",
  },
  boxRight: {
    width: "60%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
  },
  boxRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  value: {
    fontSize: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "600",
    textAlign: "left",
  },
});
export default AnaliseGrayBox;
