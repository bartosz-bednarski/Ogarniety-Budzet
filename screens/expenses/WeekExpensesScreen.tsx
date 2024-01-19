import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import CategoryPieChart from "../../components/expenses/CategoryPieChart";
import { useEffect, useState } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import LastExpenseItemBox from "../../components/expenses/LastExpenseItemBox";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import AddCategoryButton from "../../components/expenses/AddCategoryButton";
import FrameSmall from "../../components/expenses/weekExpenses/FrameSmall";
import PieChartWithFrames from "../../components/expenses/PieChartWithFrames";
import Strip from "../../components/expenses/Strip";
import StripsColumn from "../../components/expenses/StripsColumn";
import PieChartRealisation from "../../components/expenses/PieChartRealisation";
// import PieChartComponent from "../components/PieChartComponent";

const WeekExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.weekCategoriesExpenses
  );
  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const weekExpenses = useAppSelector((state) => state.expenses.weekExpenses);
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  // console.log(weekExpenses);
  const categoriesExpensesWithNames: CategoriesExpensesWithNames =
    categoriesExpenses.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
    }));
  const lastExpenses = useAppSelector((state) => state.expenses.weekExpenses);
  const lastExpensesToShow = lastExpenses.map((item) => ({
    ...item,
    ...categories.find((cat) => cat.catId === item.catId),
  }));
  let stripsColumnData = categoriesExpenses.map((category) => ({
    ...category,
    ...plannedExpenses.find((item) => item.catId === category.catId),
  }));

  const sumOfPlannedExpenses = plannedExpenses
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllExpenses = categoriesExpenses
    .map((cat) => Number(cat.sum))
    .reduce((partialSum, a) => partialSum + a, 0);
  const toSpend = sumOfPlannedExpenses - sumOfAllExpenses;
  // const globalRealistationPieChartData = [
  //   sumOfPlannedExpenses !== 0
  //     ? Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2))
  //     : 1,
  //   100 - Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)) <
  //   0
  //     ? 0
  //     : 100 -
  //       Number(((sumOfAllExpenses / sumOfPlannedExpenses) * 100).toFixed(2)),
  // ];
  console.log(stripsColumnData);
  useEffect(() => {
    stripsColumnData = categoriesExpenses.map((category) => ({
      ...category,
      ...plannedExpenses.find((item) => item.catId === category.catId),
    }));
  }, [plannedExpenses, categoriesExpenses]);
  return (
    <>
      <View style={styles.container}>
        {bankAccountStatus === 0 && (
          <View style={styles.buttonBox}>
            <CustomButton
              title="Uzupełnij stan konta"
              onPress={() => navigation.navigate("Oszczędności")}
            />
          </View>
        )}
        {bankAccountStatus > 0 && (
          <>
            <ScrollView>
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
                  <PieChartWithFrames
                    categoriesExpensesWithNames={categoriesExpensesWithNames}
                    sumOfAllExpenses={sumOfAllExpenses}
                    toSpend={toSpend}
                  />
                  <Text style={styles.label}>
                    Realizacja wydatków w poszczególnych kategoriach
                  </Text>
                  <StripsColumn data={stripsColumnData} />
                  <Text style={styles.label}>Realizacja założeń wydatków</Text>
                  <PieChartRealisation
                    realExpenses={sumOfAllExpenses}
                    plannedExpenses={sumOfPlannedExpenses}
                  />
                  {/* <Text style={styles.label}>Realizacja założeń wydatków</Text>
                <View style={styles.globalRealistationPieChart}>
                  <PieChart
                    widthAndHeight={200}
                    series={globalRealistationPieChartData}
                    sliceColor={["red", "green"]}
                    coverRadius={0.45}
                    coverFill={COLORS_STYLE.backgroundBlack}
                  />
                </View>
                <Text style={styles.whiteText}>
                  {sumOfAllExpenses} / {sumOfPlannedExpenses} PLN
                </Text>
                */}
                </>
              )}
              {/* {lastExpensesToShow.length > 0 && (
              <>
                <Text style={styles.label}>Lista ostatnich wydatków</Text>
                <View style={styles.lastExpensesContainer}>
                  {lastExpensesToShow.map((item) => {
                    if (item.value !== 0) {
                      return (
                        <LastExpenseItemBox
                          iconName={item.iconName!}
                          price={item.value}
                          date={item.dateString}
                          key={item.id}
                        />
                      );
                    }
                  })}
                </View>
              </>
            )} */}
            </ScrollView>
          </>
        )}
      </View>
      <AddCategoryButton onPress={() => navigation.navigate("addExpense")} />
    </>
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
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
  whiteText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
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
export default WeekExpensesScreen;
