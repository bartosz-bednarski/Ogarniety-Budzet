import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import COLORS_STYLE from "../../utils/styles/colors";
const CategoryLegend: React.FC<{
  categoriesExpensesWithNames: CategoriesExpensesWithNames;
}> = ({ categoriesExpensesWithNames }) => {
  return (
    <View style={styles.container}>
      {categoriesExpensesWithNames.map((item) => {
        return (
          <View style={styles.boxItem}>
            <Text style={styles.value}>{item.sum} PLN</Text>
            <Ionicons name={item.iconName} color={item.color} size={20} />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    flex: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignContent: "center",
  },
  boxItem: {
    flexDirection: "column",
    width: 100,
    height: 100,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: COLORS_STYLE.tabGrey,
    borderWidth: 2,
    gap: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    color: COLORS_STYLE.basicGold,
    fontSize: 14,
  },
  text: {
    height: 30,
    fontSize: 12,
    width: "90%",
    textAlign: "center",
    color: "white",
  },
});
export default CategoryLegend;
