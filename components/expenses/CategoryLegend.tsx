import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoriesExpensesWithNames } from "../../types/expenses";
const CategoryLegend: React.FC<{
  categoriesExpensesWithNames: CategoriesExpensesWithNames;
}> = ({ categoriesExpensesWithNames }) => {
  return (
    <View style={styles.containerR}>
      {categoriesExpensesWithNames.map((item) => {
        return (
          <View style={styles.boxItem}>
            <Ionicons name={item.iconName} color={item.color} size={20} />
            <Text style={styles.text}> : {item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  containerR: {
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 5,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  boxItem: {
    flexDirection: "row",
    gap: 3,
  },
  text: {
    fontSize: 10,
    color: "white",
  },
});
export default CategoryLegend;
