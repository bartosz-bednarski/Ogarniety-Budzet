import { View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import YearBalanceGoldFrame from "../../components/summary/YearBalanceGoldFrame";
import MonthSummaryBox from "../../components/summary/MonthSummaryBox";
import { Navigation } from "../../types/global";
import AnaliseGrayBox from "../../components/summary/AnaliseGrayBox";
import Label from "../../utils/ui/Label";
import YearSummaryInfo from "../../components/informations/YearSummaryInfo";
import randomId from "../../utils/randomIdFunction";

const YearSummaryScreen: React.FC<{ navigation: Navigation }> = ({}) => {
  const bankAccountsStore = useAppSelector(
    (state) => state.bankAccounts.accounts
  );
  const monthExpensesStore = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const monthIncomesStore = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const yearExpensesStore = useAppSelector(
    (state) => state.expenses.yearExpenses
  );
  const yearIncomesStore = useAppSelector((state) => state.incomes.yearIncomes);

  const expensesWithIncomesByCurrency: {
    currency: string;
    expenses: number;
    incomes: number;
  }[] = [];

  const yearExpensesWithIncomesByMonths: {
    month: number;
    currency: {
      currency: string;
      sumOfExpenses: number;
      sumOfIncomes: number;
    }[];
  }[] = [];

  if (monthExpensesStore.length > 0 && monthIncomesStore.length > 0) {
    for (let i = 0; i < bankAccountsStore.length; i++) {
      const expensesMonthIndex = monthExpensesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      const incomesMonthIndex = monthIncomesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      const expensesYearIndex = yearExpensesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      const incomesYearIndex = yearIncomesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      const monthExpensesSum =
        expensesMonthIndex !== -1
          ? monthExpensesStore[expensesMonthIndex].categories
              .map((cat) => Number(cat.sum))
              .reduce((partialSum, a) => partialSum + a, 0)
          : 0;
      const monthIncomesSum =
        incomesMonthIndex !== -1
          ? monthIncomesStore[incomesMonthIndex].categories
              .map((cat) => Number(cat.value))
              .reduce((partialSum, a) => partialSum + a, 0)
          : 0;
      const yearExpensesSum =
        expensesYearIndex !== -1
          ? yearExpensesStore[expensesYearIndex].months
              .map((month) => Number(month.sumOfAllExpenses))
              .reduce((partialSum, a) => partialSum + a, 0)
          : 0;
      const yearIncomesSum =
        incomesYearIndex !== -1
          ? yearIncomesStore[incomesYearIndex].months
              .map((month) => Number(month.sumOfAllIncomes))
              .reduce((partialSum, a) => partialSum + a, 0)
          : 0;
      if (
        expensesWithIncomesByCurrency.find(
          (item) => item.currency === bankAccountsStore[i].currency
        ) === undefined
      ) {
        const sumOfExpenses = monthExpensesSum + yearExpensesSum;
        const sumOfIncomes = monthIncomesSum + yearIncomesSum;
        expensesWithIncomesByCurrency.push({
          currency: bankAccountsStore[i].currency,
          expenses: sumOfExpenses,
          incomes: sumOfIncomes,
        });
      } else if (
        expensesWithIncomesByCurrency.find(
          (item) => item.currency === bankAccountsStore[i].currency
        ) !== undefined
      ) {
        const index = expensesWithIncomesByCurrency.findIndex(
          (arrItem) => arrItem.currency === bankAccountsStore[i].currency
        );
        const sumOfExpenses = monthExpensesSum + yearExpensesSum;
        const sumOfIncomes = monthIncomesSum + yearIncomesSum;
        expensesWithIncomesByCurrency[index] = {
          currency: expensesWithIncomesByCurrency[index].currency,
          expenses: (expensesWithIncomesByCurrency[index].expenses +=
            sumOfExpenses),
          incomes: (expensesWithIncomesByCurrency[index].incomes +=
            sumOfIncomes),
        };
      }
    }

    const accountWithYearIncomesIndex = yearIncomesStore.findIndex(
      (item) => item.months.length > 0
    );

    if (yearIncomesStore.length > 0 && yearExpensesStore.length > 0) {
      for (
        let x = 0;
        x < yearIncomesStore[accountWithYearIncomesIndex].months.length;
        x++
      ) {
        const month =
          yearIncomesStore[accountWithYearIncomesIndex].months[x].month;
        const monthToPush: {
          month: number;
          currency: {
            currency: string;
            sumOfExpenses: number;
            sumOfIncomes: number;
          }[];
        } = {
          month: month,
          currency: [],
        };
        for (let i = 0; i < bankAccountsStore.length; i++) {
          const yearExpensesindex = yearExpensesStore.findIndex(
            (item) => item.bankAccountId === bankAccountsStore[i].accountId
          );
          const yearIncomesindex = yearIncomesStore.findIndex(
            (item) => item.bankAccountId === bankAccountsStore[i].accountId
          );
          const currencyIndex = monthToPush.currency.findIndex(
            (z) => z.currency === bankAccountsStore[i].currency
          );
          if (currencyIndex === -1) {
            const currencyToPush = {
              currency: bankAccountsStore[i].currency,
              sumOfExpenses:
                yearExpensesStore[yearExpensesindex] !== undefined
                  ? yearExpensesStore[yearExpensesindex].months[x]
                      .sumOfAllExpenses
                  : 0,
              sumOfIncomes:
                yearIncomesStore[yearIncomesindex] !== undefined
                  ? yearIncomesStore[yearIncomesindex].months[x].sumOfAllIncomes
                  : 0,
            };
            monthToPush.currency.push(currencyToPush);
          } else if (currencyIndex !== -1) {
            monthToPush.currency[currencyIndex] = {
              currency: monthToPush.currency[currencyIndex].currency,
              sumOfExpenses:
                yearExpensesStore[yearExpensesindex] !== undefined
                  ? (monthToPush.currency[currencyIndex].sumOfExpenses +=
                      yearExpensesStore[yearExpensesindex].months[
                        x
                      ].sumOfAllExpenses)
                  : 0,
              sumOfIncomes:
                yearIncomesStore[yearIncomesindex] !== undefined
                  ? (monthToPush.currency[currencyIndex].sumOfIncomes +=
                      yearIncomesStore[yearIncomesindex].months[
                        x
                      ].sumOfAllIncomes)
                  : 0,
            };
          }
        }
        yearExpensesWithIncomesByMonths.push(monthToPush);
      }
    }
  }

  return (
    <View style={styles.container}>
      {yearIncomesStore.length === 0 && <YearSummaryInfo />}
      {yearIncomesStore.length > 0 && (
        <ScrollView>
          {expensesWithIncomesByCurrency.map((item) => (
            <View key={randomId()}>
              <Label value={`Analiza finansowa w ${item.currency}`} />
              <AnaliseGrayBox
                incomes={item.incomes}
                expenses={item.expenses}
                currency={item.currency}
              />
            </View>
          ))}

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <YearBalanceGoldFrame
              data={expensesWithIncomesByCurrency.map((item) => ({
                currency: item.currency,
                value: Number(item.incomes) - Number(item.expenses),
              }))}
            />
          </View>
          <View style={{ width: "98%" }}>
            {yearExpensesWithIncomesByMonths.map((item) => (
              <MonthSummaryBox data={item} key={item.month} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 30,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  rowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  pieChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  text: {
    color: "white",
  },

  rowBoxTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    width: "96%",
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  informationText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
  },
});
export default YearSummaryScreen;
