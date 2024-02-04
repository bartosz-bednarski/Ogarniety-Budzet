import { CategoryItem } from "./settings";
export type CategoriesIncomes = {
  catId: string;
  date: string;
  dateString: string;
  value: number;
}[];
export type YearIncomes = {
  month: number;
  sumOfAllIncomes: number;
  categoriesIncomes: {
    catId: string;
    value: number;
    stillExsists: boolean;
  }[];
}[];
export type YearsIncomes = {
  year: number;
  sumOfAllIncomes: number;
  months: {
    month: number;
    sumOfAllIncomes: number;
    categoriesIncomes: {
      catId: string;
      value: number;
      stillExsists: boolean;
    }[];
  }[];
}[];

export type IncomesInitialState = {
  categoriesIncomes: CategoriesIncomes;
  yearIncomes: YearIncomes;
  yearsIncomes: YearsIncomes;
  curentYear: number;
};
export type IncomesCategoriesInitialState = {
  categoriesList: CategoryItem[];
};
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
export type YearIncomesBoxProps = {
  year: number;
  sumOfAllIncomes: number;
  months: {
    month: number;
    sumOfAllIncomes: number;
    categoriesIncomes: {
      catId: string;
      value: number;
      stillExsists: boolean;
    }[];
  }[];
};
