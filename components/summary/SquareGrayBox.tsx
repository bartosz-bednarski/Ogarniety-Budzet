import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import pieChartColors from "../../utils/styles/pieChartColors";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

const SquareGrayBox: React.FC<{
  accountId: string;
  index: number;
  accountName: string;
  accountStatus: number;
  currency: string;
}> = ({ accountId, index, accountName, accountStatus, currency }) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxRow}>
        <Ionicons name="wallet" size={24} color={COLORS_STYLE.basicGold} />
        <Text style={[styles.accountName, { color: pieChartColors[index] }]}>
          {accountName}
        </Text>
      </View>
      <View style={styles.boxRow}>
        <Text style={styles.value}>
          {numberWithSpaces(Math.abs(Number(accountStatus.toFixed(2))))}
        </Text>
        <Text style={styles.value}>{currency}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 10,
    borderRadius: 10,
    minHeight: 100,
  },
  boxRow: {
    flexDirection: "row",
    width: "100%",
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },
  accountName: {
    fontSize: 20,
    color: "red",
    width: "80%",
    fontWeight: "600",
  },
  value: {
    color: COLORS_STYLE.basicGold,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
});
export default SquareGrayBox;
