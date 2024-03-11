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
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const monthCategoriesExpensesStore = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const weekExpensesStore = useAppSelector(
    (state) => state.expenses.weekExpenses
  );
  const plannedExpensesStore = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );

  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);

  const plannedExpensesCurrencyIndex = plannedExpensesStore.findIndex(
    (item) => item.currency === activeBankAccountStore.currency
  );
  const bankAccountsIdsWithActiveCurrency = bankAccounts.map(
    (item) =>
      item.currency === activeBankAccountStore.currency && item.accountId
  );

  const weekExpensesByCurrency: { catId: string; sum: number }[] = [];
  for (let i = 0; i < weekCategoriesExpensesStore.length; i++) {
    const checkId = bankAccountsIdsWithActiveCurrency.findIndex(
      (item) => item === weekCategoriesExpensesStore[i].bankAccountId
    );
    if (checkId !== -1) {
      weekExpensesByCurrency.push(...weekCategoriesExpensesStore[i].categories);
    }
  }

  const weekExpensesByCurrencySum: { catId: string; sum: number }[] = [];
  for (let i = 0; i < weekExpensesByCurrency.length; i++) {
    if (weekExpensesByCurrencySum.length === 0) {
      weekExpensesByCurrencySum.push({
        catId: weekExpensesByCurrency[i].catId,
        sum: weekExpensesByCurrency[i].sum,
      });
    } else if (weekExpensesByCurrencySum.length > 0) {
      const catIdIndex = weekExpensesByCurrencySum.findIndex(
        (item) => item.catId === weekExpensesByCurrency[i].catId
      );
      if (catIdIndex === -1) {
        weekExpensesByCurrencySum.push({
          catId: weekExpensesByCurrency[i].catId,
          sum: weekExpensesByCurrency[i].sum,
        });
      } else if (catIdIndex !== -1) {
        weekExpensesByCurrencySum[catIdIndex].sum =
          weekExpensesByCurrencySum[catIdIndex].sum +
          weekExpensesByCurrency[i].sum;
      }
    }
  }
  const monthExpensesByCurrency: { catId: string; sum: number }[] = [];
  for (let i = 0; i < monthCategoriesExpensesStore.length; i++) {
    const checkId = bankAccountsIdsWithActiveCurrency.findIndex(
      (item) => item === monthCategoriesExpensesStore[i].bankAccountId
    );
    if (checkId !== -1) {
      monthExpensesByCurrency.push(
        ...monthCategoriesExpensesStore[i].categories
      );
    }
  }
  const monthExpensesByCurrencySum: { catId: string; sum: number }[] = [];
  for (let i = 0; i < monthExpensesByCurrency.length; i++) {
    if (monthExpensesByCurrencySum.length === 0) {
      monthExpensesByCurrencySum.push({
        catId: monthExpensesByCurrency[i].catId,
        sum: monthExpensesByCurrency[i].sum,
      });
    } else if (monthExpensesByCurrencySum.length > 0) {
      const catIdIndex = monthExpensesByCurrencySum.findIndex(
        (item) => item.catId === monthExpensesByCurrency[i].catId
      );
      if (catIdIndex === -1) {
        monthExpensesByCurrencySum.push({
          catId: monthExpensesByCurrency[i].catId,
          sum: monthExpensesByCurrency[i].sum,
        });
      } else if (catIdIndex !== -1) {
        monthExpensesByCurrencySum[catIdIndex].sum =
          monthExpensesByCurrencySum[catIdIndex].sum +
          monthExpensesByCurrency[i].sum;
      }
    }
  }

  const plannedExpenses: {
    catId: string;
    iconName: string;
    name: string;
    value: number;
  }[] = [];
  if (plannedExpensesCurrencyIndex !== -1) {
    for (
      let i = 0;
      i < plannedExpensesStore[plannedExpensesCurrencyIndex].expenses.length;
      i++
    ) {
      const monthExpensesSumIndex = monthExpensesByCurrencySum.findIndex(
        (item) =>
          item.catId ===
          plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i].catId
      );
      const weekExpensesSumIndex = weekExpensesByCurrencySum.findIndex(
        (item) =>
          item.catId ===
          plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i].catId
      );
      if (monthExpensesSumIndex !== -1) {
        let value = 0;
        if (weekExpensesSumIndex === -1) {
          value = Number(
            plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i].value
          );
        } else if (weekExpensesSumIndex !== -1) {
          value =
            Number(
              plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i]
                .value
            ) -
            Number(monthExpensesByCurrencySum[monthExpensesSumIndex].sum) +
            Number(weekExpensesByCurrencySum[weekExpensesSumIndex].sum);
        }

        plannedExpenses.push({
          catId:
            plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i]
              .catId,
          iconName:
            plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i]
              .iconName,
          name: plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i]
            .name,
          value: value,
        });
      } else if (monthExpensesSumIndex === -1) {
        plannedExpenses.push({
          ...plannedExpensesStore[plannedExpensesCurrencyIndex].expenses[i],
        });
      }
    }
  }

  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStore.accountId
  );

  const categoriesExpenses: { catId: string; sum: number }[] = [];
  for (let i = 0; i < weekCategoriesExpensesStore.length; i++) {
    const bankAccountIndex = bankAccountsIdsWithActiveCurrency.findIndex(
      (item) => item === weekCategoriesExpensesStore[i].bankAccountId
    );
    if (bankAccountIndex !== -1) {
      for (
        let x = 0;
        x < weekCategoriesExpensesStore[i].categories.length;
        x++
      ) {
        const catIdIndex =
          categoriesExpenses.length > 0
            ? categoriesExpenses.findIndex(
                (cat) =>
                  cat.catId ===
                  weekCategoriesExpensesStore[i].categories[x].catId
              )
            : -1;
        if (catIdIndex === -1) {
          categoriesExpenses.push({
            catId: weekCategoriesExpensesStore[i].categories[x].catId,
            sum: weekCategoriesExpensesStore[i].categories[x].sum,
          });
        } else if (catIdIndex !== -1) {
          const catIdIndexToUpdate = categoriesExpenses.findIndex(
            (item) =>
              item.catId === weekCategoriesExpensesStore[i].categories[x].catId
          );
          categoriesExpenses[catIdIndexToUpdate].sum =
            Number(categoriesExpenses[catIdIndexToUpdate].sum) +
            Number(weekCategoriesExpensesStore[i].categories[x].sum);
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

  const lastExpenses = weekExpensesStore.filter(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );

  const lastExpensesToShow = lastExpenses.map((item) => ({
    ...item,
    ...categories.find((cat) => cat.catId === item.catId),
    iconColorNumber: categories.findIndex((cat) => cat.catId === item.catId),
  }));
  const stripsColumnData: {
    catId: string;
    sum: number;
    iconName: string;
    name: string;
    value: number;
  }[] = categoriesExpenses.map((category) => {
    const plannedExpensesItemIndex = plannedExpenses.findIndex(
      (item) => item.catId === category.catId
    );

    return {
      catId: category.catId,
      sum: category.sum,
      iconName: plannedExpenses[plannedExpensesItemIndex].iconName,
      name: plannedExpenses[plannedExpensesItemIndex].name,
      value:
        plannedExpenses[plannedExpensesItemIndex].value > 0
          ? plannedExpenses[plannedExpensesItemIndex].value
          : category.sum,
    };
  });
  const sumOfPlannedExpenses =
    plannedExpenses
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0) > 0
      ? plannedExpenses
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;

  const sumOfAllExpenses = categoriesExpenses
    .map((cat) => Number(cat.sum))
    .reduce((partialSum, a) => partialSum + a, 0);
  const toSpend =
    sumOfPlannedExpenses > 0 ? sumOfPlannedExpenses - sumOfAllExpenses : 1;
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
        categories.length > 0 && (
          <InfoDateUpdate
            goldText="Nowy Tydzień"
            whiteText="Uzupełnij swoje wydatki"
            arrow="down"
          />
        )}
      {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 && (
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
            <View>
              <PieChartWithFrames
                categoriesExpensesWithNames={categoriesExpensesWithNames}
                sumOfAllExpenses={sumOfAllExpenses}
                toSpend={toSpend}
              />
              <Label value="Kategorie wydatków" />

              <StripsColumn data={stripsColumnData} />
              <Label value="Planowane wydatki" />
              <PieChartRealisation
                realExpenses={sumOfAllExpenses}
                plannedExpenses={sumOfPlannedExpenses}
              />
            </View>
          )}
          {lastExpensesToShow.length > 0 && (
            <View>
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
            </View>
          )}
        </ScrollView>
      )}
      {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 &&
        categories.length > 0 && (
          <AddCircleButton
            onPress={() => navigation.navigate("addExpense")}
            name="Dodaj wydatek"
          />
        )}
    </View>
  );
};
const styles = StyleSheet.create({
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
