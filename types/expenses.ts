import { PlannedExpenseCategoryItem, CategoryItem } from "./settings";

export type WeekExpenses = {
  catId: string;
  value: number;
  date: string;
  dateString: string;
  id: string;
  bankAccountId: string;
}[];
export type WeekCategoriesExpenses = {
  bankAccountId: string;
  categories: { catId: string; sum: number }[];
}[];
export type MonthExpenses = {
  catId: string;
  value: number;
  date: string;
  dateString: string;
  id: string;
  bankAccountId: string;
}[];
export type MonthCategoriesExpenses = {
  bankAccountId: string;
  categories: { catId: string; sum: number }[];
}[];
export type YearExpenses = {
  bankAccountId: string;
  months: {
    month: number;
    sumOfAllExpenses: number;
    categoriesExpenses: {
      catId: string;
      sum: number;
      stillExsists: boolean;
      bankAccountId: string;
    }[];
  }[];
}[];
export type YearsExpenses = {
  bankAccountId: string;
  years: {
    year: number;
    sumOfAllExpenses: number;
    months: {
      month: number;
      sumOfAllExpenses: number;
      categoriesExpenses: {
        catId: string;
        sum: number;
        stillExsists: boolean;
        bankAccountId: string;
      }[];
    }[];
  }[];
}[];
export type ExpensesInitialState = {
  weekExpenses: WeekExpenses;
  weekCategoriesExpenses: WeekCategoriesExpenses;
  monthExpenses: MonthExpenses;
  monthCategoriesExpenses: MonthCategoriesExpenses;
  yearExpenses: YearExpenses;
  yearsExpenses: YearsExpenses;
  plannedExpenses: PlannedExpenseCategoryItem[];
  weekExpensesUpdated: boolean;
  dateToUpdateWeek: string;
  curentYear: number;
  currentMonth: number;
};
export type ExpensesCategoriesInitialState = {
  categoriesList: CategoryItem[];
};

export type CategoryPieChartProps = {
  plannedExpense: number;
  realExpense: number;
  iconName: string;
  name: string;
};
export type SingleExpenseProps = {
  iconName: string;
  price: number;
  date: string;
  name: string | undefined;
  color: number;
  id: string;
  catId: string;
};
export type CategoriesExpensesWithNames = {
  catId: string;
  iconName?: string;
  name?: string;
  color: string;
  sum: number;
}[];
export type MonthExpensesBoxProps = {
  month: number;
  sumOfAllExpenses: number;
  categoriesExpenses: {
    catId: string;
    sum: number;
    stillExsists: boolean;
  }[];
};
