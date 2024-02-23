import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

const BalanceGoldFrame: React.FC<{
  incomes: number;
  currency: string;
  expenses: number;
}> = ({ incomes, expenses, currency }) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxRow}>
        <Ionicons
          name="trending-up-outline"
          color={COLORS_STYLE.basicGold}
          size={24}
        />
        <Text style={[styles.label, { color: "green" }]}>Przychody</Text>
        <View style={styles.valueBox}>
          <Text style={styles.value}>
            {numberWithSpaces(Number(incomes.toFixed(2)))}
          </Text>
          <Text style={styles.value}>{currency}</Text>
        </View>
      </View>
      <View style={styles.boxRow}>
        <Ionicons
          name="trending-down-outline"
          color={COLORS_STYLE.basicGold}
          size={24}
        />
        <Text style={[styles.label, { color: "red" }]}>Wydatki</Text>
        <View style={styles.valueBox}>
          <Text style={styles.value}>
            {numberWithSpaces(Number(expenses.toFixed(2)))}
          </Text>
          <Text style={styles.value}>{currency}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    gap: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  boxRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    width: "30%",
  },
  valueBox: {
    flexDirection: "row",
    gap: 5,
    marginLeft: 10,
    width: "50%",
  },
  value: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default BalanceGoldFrame;
