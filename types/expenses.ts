export type CategoryPieChartProps = {
  plannedExpense: number;
  realExpense: number;
  iconName: string;
  name: string;
};
export type LastExpenseItemBoxProps = {
  iconName: string;
  price: number;
  date: string;
};
export type CategoriesExpensesWithNames = {
  catId: string;
  iconName?: any;
  name?: string | undefined;
  color: string;
  sum: number;
}[];
