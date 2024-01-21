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
