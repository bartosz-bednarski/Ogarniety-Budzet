import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import CategoryPieChart from "../../components/expenses/CategoryPieChart";
import { useEffect } from "react";
// import PieChartComponent from "../components/PieChartComponent";

const ActualExpensesScreen = () => {
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.categoriesExpenses
  );
  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const categoriesExpensesWithNames = categoriesExpenses.map((category) => ({
    ...category,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    ...categories.find((item) => item.catId === category.catId),
  }));

  let currentCategoryRealistationPieChartData = categoriesExpenses.map(
    (category) => ({
      ...category,
      ...plannedExpenses.find((item) => item.catId === category.catId),
    })
  );

  const sumOfPlannedExpenses = plannedExpenses
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllExpenses = categoriesExpenses
    .map((cat) => Number(cat.sum))
    .reduce((partialSum, a) => partialSum + a, 0);

  const globalRealistationPieChartData = [
    Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)),
    100 - Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)) <
    0
      ? 0
      : 100 -
        Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)),
  ];
  useEffect(() => {
    currentCategoryRealistationPieChartData = categoriesExpenses.map(
      (category) => ({
        ...category,
        ...plannedExpenses.find((item) => item.catId === category.catId),
      })
    );
  }, [plannedExpenses, categoriesExpenses]);
  console.log(currentCategoryRealistationPieChartData);
  console.log("categoriesExpenses", categoriesExpenses);
  console.log("plannedExpenses", plannedExpenses);
  // console.log("categoriesList", categories);
  // console.log("totalSum", sumOfAllExpenses);
  // console.log("categoriesExpensesWithNames", categoriesExpensesWithNames);
  // console.log(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2));
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sumOfExpenses}>Wydano {sumOfAllExpenses} PLN</Text>
      <Text style={styles.label}>Kategorie wydatków</Text>
      <View style={styles.expensesCategories}>
        {sumOfAllExpenses > 0 && (
          <PieChart
            widthAndHeight={200}
            series={categoriesExpensesWithNames.map((item) => item.sum)}
            sliceColor={categoriesExpensesWithNames.map((item) => item.color)}
            coverRadius={0.45}
            coverFill={COLORS_STYLE.tabGrey}
          />
        )}
        <View style={styles.legend}>
          {categoriesExpensesWithNames.map((item) => (
            <Ionicons
              name={item.iconName}
              color={item.color}
              size={24}
              key={item.catId}
            />
          ))}
        </View>
      </View>
      <Text style={styles.label}>Realizacja założeń wydatków</Text>
      <View style={styles.globalRealistationPieChart}>
        {sumOfAllExpenses > 0 && (
          <PieChart
            widthAndHeight={200}
            series={globalRealistationPieChartData}
            sliceColor={["red", "green"]}
            coverRadius={0.45}
            coverFill={COLORS_STYLE.backgroundBlack}
          />
        )}
      </View>
      <Text style={styles.label}>
        Realizacja wydatków w poszczególnych kategoriach
      </Text>
      <View style={styles.categoryExpenseBox}>
        {currentCategoryRealistationPieChartData.map((item) => (
          <CategoryPieChart
            plannedExpense={item.value}
            realExpense={item.sum}
            key={item.catId}
            iconName={item.iconName}
            name={item.name}
          />
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  sumOfExpenses: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
  expensesCategories: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS_STYLE.tabGrey,
    height: 250,
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  globalRealistationPieChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  categoryExpenseBox: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
});
export default ActualExpensesScreen;
