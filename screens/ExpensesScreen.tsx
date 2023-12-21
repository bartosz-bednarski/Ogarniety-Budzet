import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useAppSelector } from "../redux/hooks";
import PieChartComponent from "../components/PieChartComponent";

const ExpensesScreen = () => {
  const screenWidth = Dimensions.get("screen").width;
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.categoriesExpenses
  );
  const categoriesExpensesWithNames = categoriesExpenses.map((category) => ({
    ...category,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    ...categories.find((item) => item.catId === category.catId),
  }));
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );
  const sumOfAllExpenses = categoriesExpenses
    .map((cat) => cat.sum)
    .reduce((partialSum, a) => partialSum + a, 0);
  console.log("categoriesExpenses", categoriesExpenses);
  console.log("categoriesList", categories);
  console.log("totalSum", sumOfAllExpenses);
  console.log("categoriesExpensesWithNames", categoriesExpensesWithNames);
  return (
    <View style={styles.container}>
      <Text style={styles.sumOfExpenses}>Wydano {sumOfAllExpenses} PLN</Text>
      <View style={styles.pieChart}>
        <PieChartComponent categoriesExpenses={categoriesExpenses} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  sumOfExpenses: {
    fontSize: 30,
    fontWeight: "600",
  },
  pieChart: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ExpensesScreen;
