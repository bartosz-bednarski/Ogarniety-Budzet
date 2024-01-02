import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { LastExpenseItemBoxProps } from "../../types/expenses";
const LastExpenseItemBox: React.FC<LastExpenseItemBoxProps> = ({
  iconName,
  price,
  date,
}) => {
  return (
    <View style={styles.lastExpenseBox}>
      <View style={styles.lastExpenseLeft}>
        <Ionicons name={iconName} size={25} color="white" />
        <Text style={styles.lastExpensePrice}>{price} PLN</Text>
      </View>
      <Text style={styles.lastExpenseDate}>{date}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  lastExpenseBox: {
    height: 50,
    borderRadius: 15,
    width: "100%",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  lastExpensePrice: {
    fontSize: 16,
    color: "white",
  },
  lastExpenseLeft: {
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  lastExpenseDate: {
    color: "white",
  },
});
export default LastExpenseItemBox;
