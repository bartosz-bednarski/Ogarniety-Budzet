import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import randomId from "../../utils/randomIdFunction";

const YearBalanceGoldFrame: React.FC<{
  data: { currency: string; value: number }[];
}> = ({ data }) => {
  return (
    <View style={styles.balanseBox}>
      <Text style={styles.whiteText}>BILANS</Text>
      {data.map((item) => (
        <View style={styles.rowBox} key={randomId()}>
          <Text
            style={[
              styles.rowText,
              item.value > 0
                ? { color: COLORS_STYLE.green }
                : { color: COLORS_STYLE.red },
            ]}
          >
            {item.value > 0 ? "+" : "-"}
          </Text>
          <Text
            style={[
              styles.rowText,
              item.value > 0
                ? { color: COLORS_STYLE.green }
                : { color: COLORS_STYLE.red },
            ]}
          >
            {numberWithSpaces(Math.abs(Number(item.value.toFixed(2))))}
          </Text>
          <Text style={[styles.rowText, { color: COLORS_STYLE.basicGold }]}>
            {item.currency}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  balanseBox: {
    width: "70%",
    borderWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    gap: 10,
    marginVertical: 50,
  },
  whiteText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
  },
  rowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  rowText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginRight: 7,
  },
});
export default YearBalanceGoldFrame;
