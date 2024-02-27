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
  widthStyle: any;
}> = ({
  accountId,
  index,
  accountName,
  accountStatus,
  currency,
  widthStyle,
}) => {
  return (
    <View style={[styles.container, { width: widthStyle }]}>
      <Text style={[styles.accountName, { color: pieChartColors[index] }]}>
        {accountName}
      </Text>
      <View style={styles.boxRow}>
        <Ionicons
          name="journal"
          size={20}
          color="white"
          style={{ transform: [{ rotate: "90deg" }] }}
        />
        <Text style={styles.whiteText}>Stan konta:</Text>
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
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 0,
    borderRadius: 10,
    minHeight: 100,
  },
  boxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  accountName: {
    fontSize: 20,
    color: "red",
    width: "100%",
    fontWeight: "600",
    marginBottom: 5,
  },
  value: {
    color: COLORS_STYLE.basicGold,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  whiteText: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    fontWeight: "600",
  },
});
export default SquareGrayBox;
