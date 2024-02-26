import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import COLORS_STYLE from "../../utils/styles/colors";
import { useEffect } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import SingleExpense from "../../components/expenses/SingleExpense";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import { Navigation } from "../../types/global";
import PieChartWithFrames from "../../components/expenses/PieChartWithFrames";
import StripsColumn from "../../utils/ui/StripsColumn";
import PieChartRealisation from "../../components/expenses/PieChartRealisation";
import AddCircleButton from "../../utils/ui/AddCircleButton";
import InfoDateUpdate from "../../utils/ui/InfoDateUpdate";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";
import UpdateExpensesCategoriesInfo from "../../components/informations/UpdateExpensesCategoriesInfo";
import Label from "../../utils/ui/Label";

const WeekExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const categories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );
  const weekCategoriesExpensesStore = useAppSelector(
    (state) => state.expenses.weekCategoriesExpenses
  );
  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );

  const weekExpensesStore = useAppSelector(
    (state) => state.expenses.weekExpenses
  );
  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);

  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStoreId
  );

  const weekCategoriesExpensesIndexOfCurrentId =
    weekCategoriesExpensesStore.findIndex(
      (item) => item.bankAccountId === activeBankAccountStoreId
    );

  const categoriesExpenses =
    weekCategoriesExpensesIndexOfCurrentId !== -1
      ? weekCategoriesExpensesStore[weekCategoriesExpensesIndexOfCurrentId]
          .categories
      : [
          {
            catId: "null",
            sum: 0,
          },
        ];

  const categoriesExpensesWithNames: CategoriesExpensesWithNames =
    categoriesExpenses.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
    }));

  const lastExpenses = weekExpensesStore.filter(
    (item) => item.bankAccountId === activeBankAccountStoreId
  );

  const lastExpensesToShow = lastExpenses.map((item) => ({
    ...item,
    ...categories.find((cat) => cat.catId === item.catId),
    iconColorNumber: categories.findIndex((cat) => cat.catId === item.catId),
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

  useEffect(() => {
    stripsColumnData = categoriesExpenses.map((category) => ({
      ...category,
      ...plannedExpenses.find((item) => item.catId === category.catId),
    }));
  }, [plannedExpenses, categoriesExpenses]);
  return (
    <>
      <View style={styles.container}>
        {(bankAccounts.length === 0 ||
          bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus ===
            0) && (
          <UpdateBankAccountInfo
            onPress={() => navigation.navigate("Oszczędności")}
          />
        )}
        {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 &&
          sumOfAllExpenses === 0 &&
          categories.length > 0 && (
            <InfoDateUpdate
              goldText="Nowy Tydzień"
              whiteText="Uzupełnij swoje wydatki"
              arrow="down"
            />
          )}
        {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus >
          0 && (
          <ScrollView style={styles.scrollView}>
            {categories.length === 0 && (
              <UpdateExpensesCategoriesInfo
                onPress={() =>
                  navigation.navigate("settingsNavigator", {
                    screen: "addNewCategory",
                  })
                }
              />
            )}

            {sumOfAllExpenses > 0 && (
              <>
                <PieChartWithFrames
                  categoriesExpensesWithNames={categoriesExpensesWithNames}
                  sumOfAllExpenses={sumOfAllExpenses}
                  toSpend={toSpend}
                />
                <Label value="Realizacja wydatków w poszczególnych kategoriach" />

                <StripsColumn data={stripsColumnData} />
                <Label value="Realizacja założeń wydatków" />
                <PieChartRealisation
                  realExpenses={sumOfAllExpenses}
                  plannedExpenses={sumOfPlannedExpenses}
                />
              </>
            )}
            {lastExpensesToShow.length > 0 && (
              <>
                {sumOfAllExpenses > 0 && (
                  <Label value="Lista ostatnich wydatków" />
                )}
                <View style={styles.lastExpensesContainer}>
                  {lastExpensesToShow.map((item) => {
                    if (item.value !== 0) {
                      return (
                        <SingleExpense
                          iconName={item.iconName!}
                          price={item.value}
                          date={item.dateString}
                          key={item.id}
                          color={item.iconColorNumber}
                          name={item.name}
                          id={item.id}
                          catId={item.catId}
                        />
                      );
                    }
                  })}
                </View>
              </>
            )}
          </ScrollView>
        )}
        {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus >
          0 && (
          <AddCircleButton
            onPress={() => navigation.navigate("addExpense")}
            name="Dodaj wydatek"
          />
        )}
      </View>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  scrollView: {
    flex: 9,
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
