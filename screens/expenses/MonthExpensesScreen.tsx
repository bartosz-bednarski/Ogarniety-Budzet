import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import CategoryPieChart from "../../components/expenses/CategoryPieChart";
import { useEffect, useState } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import LastExpenseItemBox from "../../components/expenses/LastExpenseItemBox";
import CategoryLegend from "../../components/expenses/CategoryLegend";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import SumBox from "../../components/SumBox";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import AddCategoryButton from "../../components/expenses/AddCategoryButton";
import GoldenFrame from "../../utils/ui/GoldenFrame";
// import PieChartComponent from "../components/PieChartComponent";

const MonthExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );

  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const categoriesExpensesWithNames: CategoriesExpensesWithNames =
    categoriesExpenses.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
    }));
  // const lastExpenses = useAppSelector((state) => state.expenses.monthExpenses);
  // const lastExpensesToShow = lastExpenses.map((item) => ({
  //   ...item,
  //   ...categories.find((cat) => cat.catId === item.catId),
  // }));
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
    sumOfPlannedExpenses !== 0
      ? Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2))
      : 1,
    100 - Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)) <
    0
      ? 0
      : 100 -
        Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)),
  ];
  const [showLegend, setShowLegend] = useState(false);
  useEffect(() => {
    currentCategoryRealistationPieChartData = categoriesExpenses.map(
      (category) => ({
        ...category,
        ...plannedExpenses.find((item) => item.catId === category.catId),
      })
    );
  }, [plannedExpenses, categoriesExpenses]);
  // console.log("lastExp", lastExpensesToShow);
  // console.log(currentCategoryRealistationPieChartData);
  // console.log("categoriesExpenses", categoriesExpenses);
  // console.log("plannedExpenses", plannedExpenses);
  // console.log("categoriesList", categories);
  // console.log("totalSum", sumOfAllExpenses);
  // console.log("categoriesExpensesWithNames", categoriesExpensesWithNames);
  // console.log(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2));
  return (
    <View style={styles.container}>
      <ScrollView>
        <GoldenFrame name="SUMA" value={sumOfAllExpenses} />
        {sumOfAllExpenses === 0 && (
          <View style={styles.informationBox}>
            <CustomButton
              title="Dodaj wydatek"
              onPress={() => navigation.navigate("addExpense")}
            />
          </View>
        )}

        {sumOfAllExpenses > 0 && (
          <>
            <Text style={styles.label}>Zestawienie wydatków</Text>
            <Pressable
              style={styles.expensesCategories}
              onPress={() => setShowLegend(!showLegend)}
            >
              {showLegend && (
                <CategoryLegend
                  categoriesExpensesWithNames={categoriesExpensesWithNames}
                />
              )}
              {!showLegend && (
                <>
                  <PieChart
                    widthAndHeight={200}
                    series={categoriesExpensesWithNames.map((item) => item.sum)}
                    sliceColor={categoriesExpensesWithNames.map(
                      (item) => item.color
                    )}
                    coverRadius={0.45}
                    coverFill={COLORS_STYLE.tabGrey}
                  />

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
                </>
              )}
            </Pressable>
          </>
        )}
        {sumOfAllExpenses > 0 && (
          <>
            <Text style={styles.label}>Realizacja założeń wydatków</Text>
            <View style={styles.globalRealistationPieChart}>
              <PieChart
                widthAndHeight={200}
                series={globalRealistationPieChartData}
                sliceColor={["red", "green"]}
                coverRadius={0.45}
                coverFill={COLORS_STYLE.backgroundBlack}
              />
            </View>
            <Text style={styles.label}>
              Realizacja wydatków w poszczególnych kategoriach
            </Text>
            <View style={styles.categoryExpenseBox}>
              {currentCategoryRealistationPieChartData.map((item) => (
                <CategoryPieChart
                  plannedExpense={Number(item.value)}
                  realExpense={item.sum}
                  key={item.catId}
                  iconName={item.iconName}
                  name={String(item.name)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <AddCategoryButton onPress={() => navigation.navigate("addExpense")} />
    </View>
  );
};
const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
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
    height: 300,
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
    justifyContent: "center",
  },
  lastExpensesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    gap: 5,
  },
});
export default MonthExpensesScreen;
