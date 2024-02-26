import { View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import YearsSummaryBox from "../../components/summary/YearsSummaryBox";
import SquareBorderBox from "../../components/summary/SquareBorderBox";
import YearBalanceGoldFrame from "../../components/summary/YearBalanceGoldFrame";
import YearsSummaryInfo from "../../components/informations/YearsSummaryInfo";

const YearsSummaryScreen = () => {
  const bankAccountsStore = useAppSelector(
    (state) => state.bankAccounts.accounts
  );
  const yearsIncomesStore = useAppSelector(
    (state) => state.incomes.yearsIncomes
  );
  const yearsExpensesStore = useAppSelector(
    (state) => state.expenses.yearsExpenses
  );

  const yearsExpensesWithIncomes = yearsIncomesStore.map((item) => {
    const expensesAccountIndex = yearsExpensesStore.findIndex(
      (i) => i.bankAccountId === item.bankAccountId
    );
    return {
      bankAccount: item.bankAccountId,
      currency:
        bankAccountsStore[
          bankAccountsStore.findIndex((i) => i.accountId === item.bankAccountId)
        ].currency,
      years: item.years.map((year) => {
        const expensesAccountYearIndex = yearsExpensesStore[
          expensesAccountIndex
        ].years.findIndex((i) => i.year === year.year);
        return {
          year: year.year,
          sumOfAllExpenses:
            expensesAccountYearIndex !== -1
              ? yearsExpensesStore[expensesAccountIndex].years[
                  expensesAccountYearIndex
                ].sumOfAllExpenses
              : 0,
          sumOfAllIncomes: year.sumOfAllIncomes,
          months: year.months.map((month) => {
            const expensesAccountMonthIndex = yearsExpensesStore[
              expensesAccountIndex
            ].years[expensesAccountYearIndex].months.findIndex(
              (i) => i.month === month.month
            );
            return {
              month: month.month,
              sumOfAllExpenses:
                yearsExpensesStore[expensesAccountIndex].years[
                  expensesAccountYearIndex
                ].months[expensesAccountMonthIndex].sumOfAllExpenses,
              sumOfAllIncomes: month.sumOfAllIncomes,
            };
          }),
        };
      }),
    };
  });

  const yearsExpensesWithIncomesByYears: {
    year: number;
    currency: {
      currency: string;
      sumOfAllExpenses: number;
      sumOfAllIncomes: number;
    }[];
  }[] = [];

  for (let i = 0; i < yearsExpensesWithIncomes.length; i++) {
    for (let x = 0; x < yearsExpensesWithIncomes[i].years.length; x++) {
      const yearIndex = yearsExpensesWithIncomesByYears.findIndex(
        (item) => item.year === yearsExpensesWithIncomes[i].years[x].year
      );
      if (yearIndex === -1) {
        const objToPush = {
          year: yearsExpensesWithIncomes[i].years[x].year,
          currency: [
            {
              currency: yearsExpensesWithIncomes[i].currency,
              sumOfAllExpenses:
                yearsExpensesWithIncomes[i].years[x].sumOfAllExpenses,
              sumOfAllIncomes:
                yearsExpensesWithIncomes[i].years[x].sumOfAllIncomes,
            },
          ],
        };
        yearsExpensesWithIncomesByYears.push(objToPush);
      } else if (yearIndex !== -1) {
        const currencyExsists = yearsExpensesWithIncomesByYears[
          yearIndex
        ].currency.findIndex(
          (item) => item.currency === yearsExpensesWithIncomes[i].currency
        );
        if (currencyExsists === -1) {
          yearsExpensesWithIncomesByYears[yearIndex].currency = [
            ...yearsExpensesWithIncomesByYears[yearIndex].currency,
            {
              currency: yearsExpensesWithIncomes[i].currency,
              sumOfAllExpenses:
                yearsExpensesWithIncomes[i].years[x].sumOfAllExpenses,
              sumOfAllIncomes:
                yearsExpensesWithIncomes[i].years[x].sumOfAllIncomes,
            },
          ];
        } else if (currencyExsists !== -1) {
          yearsExpensesWithIncomesByYears[yearIndex].currency[currencyExsists] =
            {
              currency: yearsExpensesWithIncomes[i].currency,
              sumOfAllExpenses:
                yearsExpensesWithIncomesByYears[yearIndex].currency[
                  currencyExsists
                ].sumOfAllExpenses +
                yearsExpensesWithIncomes[i].years[x].sumOfAllExpenses,
              sumOfAllIncomes:
                yearsExpensesWithIncomesByYears[yearIndex].currency[
                  currencyExsists
                ].sumOfAllIncomes +
                yearsExpensesWithIncomes[i].years[x].sumOfAllIncomes,
            };
        }
      }
    }
  }

  const yearsExpensesWithIncomesByCurrency = [];
  for (let i = 0; i < yearsExpensesWithIncomesByYears.length; i++) {
    const arrToPush = yearsExpensesWithIncomesByYears[i].currency.map(
      (item) => ({
        currency: item.currency,
        sumOfAllExpenses: item.sumOfAllExpenses,
        sumOfAllIncomes: item.sumOfAllIncomes,
      })
    );
    yearsExpensesWithIncomesByCurrency.push(...arrToPush);
  }
  return (
    <View style={styles.container}>
      {yearsIncomesStore.length === 0 && <YearsSummaryInfo />}
      {yearsIncomesStore.length > 0 && (
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.rowBoxTop}>
            <SquareBorderBox
              values={yearsExpensesWithIncomesByCurrency.map((i) => ({
                value: i.sumOfAllIncomes,
                currency: i.currency,
              }))}
              name="Suma przychodów"
              color="green"
            />
            <SquareBorderBox
              values={yearsExpensesWithIncomesByCurrency.map((i) => ({
                value: i.sumOfAllExpenses,
                currency: i.currency,
              }))}
              name="Suma wydatków"
              color="red"
            />
          </View>
          <YearBalanceGoldFrame
            data={yearsExpensesWithIncomesByCurrency.map((item) => ({
              currency: item.currency,
              value:
                Number(item.sumOfAllIncomes) - Number(item.sumOfAllExpenses),
            }))}
          />
          {yearsExpensesWithIncomesByYears.map((item) => (
            <YearsSummaryBox data={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
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
  monthIncomesBox: {
    gap: 15,
  },
  rowBoxTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
});
export default YearsSummaryScreen;
