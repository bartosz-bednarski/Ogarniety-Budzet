export type CategoriesIncomesWithNames = {
  catId: string;
  iconName?: string;
  name?: string;
  color: string;
  date: string;
  dateString: string;
  value: number;
}[];
export type CategoriesItemBoxData = {
  catId: string;
  iconName?: string | undefined;
  name?: string | undefined;
  value: number;
}[];

export type MonthIncomesBoxProps = {
  month: number;
  sumOfAllIncomes: number;
  categoriesIncomes: {
    catId: string;
    value: number;
    stillExsists: boolean;
  }[];
};
