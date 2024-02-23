import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../styles/colors";
import { numberWithSpaces } from "../numberWithSpaces";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";
const GrayBox100: React.FC<{ name: string; value: number }> = ({
  name,
  value,
}) => {
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const valueWithSpaces = numberWithSpaces(value);
  return (
    <View style={styles.box}>
      {(name === "Oszczędzono" || name === "Cele finansowe") && (
        <Ionicons name="wallet" color={COLORS_STYLE.basicGold} size={16} />
      )}

      <Text style={styles.textUp}>{name}</Text>

      <Text style={styles.textDown}>
        {valueWithSpaces} {activeBankAccount.currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  textUp: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 15,
  },
  textDown: {
    color: COLORS_STYLE.basicGold,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
export default GrayBox100;
