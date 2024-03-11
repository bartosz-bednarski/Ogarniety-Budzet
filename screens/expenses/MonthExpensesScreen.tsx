import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import COLORS_STYLE from "../../utils/styles/colors";
import pieChartColors from "../../utils/styles/pieChartColors";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import PieChartWithFrames from "../../components/expenses/PieChartWithFrames";
import StripsColumn from "../../utils/ui/StripsColumn";
import PieChartRealisation from "../../components/expenses/PieChartRealisation";
import InfoDateUpdate from "../../utils/ui/InfoDateUpdate";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";
import Label from "../../utils/ui/Label";

const MonthExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const categories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );
  const monthCategoriesExpensesStore = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );

  const plannedExpensesStore = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );

  const plannedExpensesCurrencyIndex = plannedExpensesStore.findIndex(
    (item) => item.currency === activeBankAccountStore.currency
  );
  const plannedExpenses =
    plannedExpensesCurrencyIndex !== -1
      ? plannedExpensesStore[plannedExpensesCurrencyIndex].expenses
      : [];

  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStore.accountId
  );

  const bankAccountsIdsWithActiveCurrency = bankAccounts.map(
    (item) =>
      item.currency === activeBankAccountStore.currency && item.accountId
  );

  const categoriesExpenses: { catId: string; sum: number }[] = [];
  for (let i = 0; i < monthCategoriesExpensesStore.length; i++) {
    const bankAccountIndex = bankAccountsIdsWithActiveCurrency.findIndex(
      (item) => item === monthCategoriesExpensesStore[i].bankAccountId
    );
    if (bankAccountIndex !== -1) {
      for (
        let x = 0;
        x < monthCategoriesExpensesStore[i].categories.length;
        x++
      ) {
        const catIdIndex =
          categoriesExpenses.length > 0
            ? categoriesExpenses.findIndex(
                (cat) =>
                  cat.catId ===
                  monthCategoriesExpensesStore[i].categories[x].catId
              )
            : -1;
        if (catIdIndex === -1) {
          categoriesExpenses.push({
            catId: monthCategoriesExpensesStore[i].categories[x].catId,
            sum: monthCategoriesExpensesStore[i].categories[x].sum,
          });
        } else if (catIdIndex !== -1) {
          const catIdIndexToUpdate = categoriesExpenses.findIndex(
            (item) =>
              item.catId === monthCategoriesExpensesStore[i].categories[x].catId
          );
          categoriesExpenses[catIdIndexToUpdate].sum =
            Number(categoriesExpenses[catIdIndexToUpdate].sum) +
            Number(monthCategoriesExpensesStore[i].categories[x].sum);
        }
      }
    }
  }

  const categoriesExpensesWithNames: CategoriesExpensesWithNames =
    categoriesExpenses.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
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

  return (
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
        categoriesExpenses.length > 0 && (
          <InfoDateUpdate
            goldText="Nowy Miesiąc"
            whiteText="Uzupełnij swoje wydatki"
            arrow="back"
          />
        )}
      {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 && (
        <ScrollView>
          {categoriesExpenses.length === 0 && (
            <View style={styles.informationBox}>
              <CustomButton
                title="Dodaj wydatek"
                onPress={() => navigation.navigate("addExpense")}
              />
            </View>
          )}
          {sumOfAllExpenses > 0 && (
            <View>
              {categories !== undefined && (
                <PieChartWithFrames
                  categoriesExpensesWithNames={categoriesExpensesWithNames}
                  sumOfAllExpenses={sumOfAllExpenses}
                  toSpend={toSpend}
                />
              )}
              <Label value="Realizacja wydatków w poszczególnych kategoriach" />

              <StripsColumn data={stripsColumnData} />
              <Label value="Realizacja założeń wydatków" />
              <PieChartRealisation
                realExpenses={sumOfAllExpenses}
                plannedExpenses={sumOfPlannedExpenses}
              />
            </View>
          )}
        </ScrollView>
      )}
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
export default MonthExpensesScreen;
