import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../styles/colors";
import { numberWithSpaces } from "../numberWithSpaces";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";
const GrayBox50: React.FC<{ name: string; value: number }> = ({
  name,
  value,
}) => {
  const currency = useAppSelector(
    (state) => state.currency.currentCurrency.currencyCode
  );
  const valueWithSpaces = numberWithSpaces(value);
  return (
    <View style={styles.box}>
      <View style={styles.textUpBox}>
        {name === "Przychody" && (
          <Ionicons
            name="trending-up-outline"
            color={COLORS_STYLE.basicGold}
            size={16}
          />
        )}
        {name === "Wydatki" && (
          <Ionicons
            name="trending-down-outline"
            color={COLORS_STYLE.basicGold}
            size={16}
          />
        )}
        <Text style={styles.textUp}>{name}</Text>
      </View>

      <Text style={styles.textDown}>
        {valueWithSpaces} {currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "48%",
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 20,
    borderRadius: 10,
  },
  textUpBox: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textUp: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  textDown: {
    color: COLORS_STYLE.basicGold,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
export default GrayBox50;
