import { useAppDispatch } from "../redux/hooks";
import { updateMonthPiggyBank } from "../redux/piggyBank-slice";
import { updateMonthIncomes } from "../redux/incomes-slice";
import {
  updateMonthExpenses,
  updateWeekExpenses,
} from "../redux/expenses-slice";
import { CategoriesIncomes } from "../types/incomes";
import { MonthExpenses, WeekExpenses } from "../types/expenses";
export const dateChangeHandler = async (
  categoriesIncomes: CategoriesIncomes,
  weekExpenses: WeekExpenses,
  weekExpensesUpdated: boolean,
  categoriesExpenses: MonthExpenses,
  currentYearInStore: number
) => {
  const dispatch = useAppDispatch();
  //Test
  let currentDay = 27;
  let currentMonth = 4;
  let currentYear = 2027;
  //INCOMES
  if (categoriesIncomes.length > 0) {
    //if jest po to żeby kod się nie  wysypał jak nie ma zdefiniowanych żadnych wydatków
    //Tak powinno być:
    // const currentMonth = new Date().getMonth();
    const monthOfLatestIncome = new Date(categoriesIncomes[0].date).getMonth();
    if (
      currentMonth > monthOfLatestIncome ||
      currentYear > currentYearInStore
    ) {
      const sumOfMonthIncomes = categoriesIncomes
        .map((item) => Number(item.value))
        .reduce((partialSum, a) => partialSum + a, 0);
      const sumOfMonthExpenses = categoriesExpenses
        .map((item) => Number(item.value))
        .reduce((partialSum, a) => partialSum + a, 0);
      const savings = Number(sumOfMonthIncomes) - Number(sumOfMonthExpenses);
      dispatch(
        updateMonthPiggyBank({
          month: monthOfLatestIncome,
          savings: savings,
        })
      );
      dispatch(updateMonthIncomes());
    }
  }

  //EXPENSES
  if (weekExpenses.length > 0) {
    if (currentDay === 1 && !weekExpensesUpdated) {
      dispatch(updateWeekExpenses(true));
    }
    if (currentDay !== 1 && weekExpensesUpdated) {
      dispatch(updateWeekExpenses(false));
    }
  }
  if (categoriesExpenses.length > 0) {
    const monthOfLatestIncome = new Date(categoriesExpenses[0].date).getMonth();
    if (
      currentMonth > monthOfLatestIncome ||
      currentYear > currentYearInStore
    ) {
      dispatch(updateMonthExpenses());
      dispatch(updateWeekExpenses("monthChange"));
    }
  }
};
