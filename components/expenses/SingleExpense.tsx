import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { SingleExpenseProps } from "../../types/expenses";
import pieChartColors from "../../utils/styles/pieChartColors";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
const SingleExpense: React.FC<SingleExpenseProps> = ({
  iconName,
  price,
  date,
  color,
  name,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.boxLeft, { borderColor: pieChartColors[color] }]}>
        <Ionicons name={iconName} size={20} color={pieChartColors[color]} />
      </View>
      <View style={styles.boxRight}>
        <Text style={styles.greyText}>{name}</Text>
        <Text style={styles.goldText}>{numberWithSpaces(price)} PLN</Text>
        <Text style={styles.greyText}>{date}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    gap: 3,
  },
  boxLeft: {
    width: "13%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  boxRight: {
    paddingHorizontal: 10,
    width: "86%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greyText: {
    color: COLORS_STYLE.labelGrey,
    width: 80,
    textAlign: "left",
  },
  goldText: {
    color: COLORS_STYLE.basicGold,
    width: 80,
  },
});
export default SingleExpense;
