import { createSlice } from "@reduxjs/toolkit";
import { PlannedExpenseCategoryItem } from "../types/settings";
type ExpensesInitialState = {
  weekExpenses: {
    catId: string;
    value: number;
    date: string;
    dateString: string;
    id: string;
  }[];
  weekCategoriesExpenses: { catId: string; sum: number }[];
  monthExpenses: {
    catId: string;
    value: number;
    date: string;
    dateString: string;
    id: string;
  }[];
  monthCategoriesExpenses: { catId: string; sum: number }[];
  yearExpenses: {
    month: number;
    sumOfAllExpenses: number;
    categoriesExpenses: {
      catId: string;
      sum: number;
      stillExsists: boolean;
    }[];
  }[];
  yearsExpenses: {
    year: number;
    sumOfAllExpenses: number;
    months: {
      month: number;
      sumOfAllExpenses: number;
      categoriesExpenses: {
        catId: string;
        sum: number;
        stillExsists: boolean;
      }[];
    }[];
  }[];
  plannedExpenses: PlannedExpenseCategoryItem[];
  weekExpensesUpdated: boolean;
  curentYear: number;
};

const dateCheck = "2027-05-26T08:06:22.626Z";
const expensesInitialState: ExpensesInitialState = {
  weekExpenses: [],
  weekCategoriesExpenses: [],
  monthExpenses: [],
  monthCategoriesExpenses: [],
  yearExpenses: [],
  yearsExpenses: [],
  plannedExpenses: [],
  weekExpensesUpdated: false,
  curentYear: new Date(dateCheck).getFullYear(),
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesInitialState,
  reducers: {
    setExpense: (state, action) => {
      state.monthCategoriesExpenses = [
        ...state.monthCategoriesExpenses,
        { catId: action.payload.catId, sum: 0 },
      ];
      state.weekCategoriesExpenses = [
        ...state.weekCategoriesExpenses,
        { catId: action.payload.catId, sum: 0 },
      ];

      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      const randLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );
      state.weekExpenses = [
        ...state.weekExpenses,
        {
          catId: action.payload.catId,
          value: 0,
          dateString: fullDate,
          // date: new Date().toJSON(),
          date: dateCheck,
          id: randLetter + Date.now(),
        },
      ];
      state.monthExpenses = [
        ...state.monthExpenses,
        {
          catId: action.payload.catId,
          value: 0,
          dateString: fullDate,
          // date: new Date().toJSON(),
          date: dateCheck,
          id: randLetter + Date.now(),
        },
      ];
    },

    addExpense: (state, action) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      const randLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );
      state.weekExpenses = [
        ...state.weekExpenses,
        {
          catId: action.payload.catId,
          value: action.payload.value,
          dateString: fullDate,
          // date: new Date().toJSON(),
          date: dateCheck,
          id: randLetter + Date.now(),
        },
      ];
      state.monthExpenses = [
        ...state.monthExpenses,
        {
          catId: action.payload.catId,
          value: action.payload.value,
          dateString: fullDate,
          // date: new Date().toJSON(),
          date: dateCheck,
          id: randLetter + Date.now(),
        },
      ];
      // Update do sum wydatków w poszczególnych kategoriach:
      // sprawdzenie czy catId dodanego wydatku istnieje?
      // znajdujemy index catId i dodajemy wartość do sumy:
      // tworzymy nowy object w array z wartoscią sum = action.payload.value
      const catIdMonthExists = state.monthCategoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);
      const catIdWeekExists = state.weekCategoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);

      //tydzień
      if (catIdWeekExists) {
        const categoryIdWeek = state.weekCategoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndexWeek = state.weekCategoriesExpenses.indexOf(
          categoryIdWeek!
        );
        state.weekCategoriesExpenses[categoryIndexWeek].sum =
          state.weekCategoriesExpenses[categoryIndexWeek].sum += Number(
            action.payload.value
          );
      } else {
        state.weekCategoriesExpenses = [
          ...state.weekCategoriesExpenses,
          { catId: action.payload.catId, sum: Number(action.payload.value) },
        ];
      }

      //miesiąc
      if (catIdMonthExists) {
        const categoryIdMonth = state.monthCategoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndexMonth = state.monthCategoriesExpenses.indexOf(
          categoryIdMonth!
        );
        state.monthCategoriesExpenses[categoryIndexMonth].sum =
          state.monthCategoriesExpenses[categoryIndexMonth].sum += Number(
            action.payload.value
          );
      } else {
        state.monthCategoriesExpenses = [
          ...state.monthCategoriesExpenses,
          { catId: action.payload.catId, sum: Number(action.payload.value) },
        ];
      }
    },
    setPlannedExpense: (state, action) => {
      state.plannedExpenses = [
        ...state.plannedExpenses,
        {
          catId: action.payload.catId,
          name: action.payload.name,
          iconName: action.payload.iconName,
          value: 0,
        },
      ];
    },
    addPlannedExpense: (state, action) => {
      const indexOfPlannedExpense = state.plannedExpenses.findIndex(
        (item) => item.catId === action.payload.catId
      );
      state.plannedExpenses[indexOfPlannedExpense] = {
        ...state.plannedExpenses[indexOfPlannedExpense],
        value: action.payload.value,
      };
    },
    updatePlannedExpenseCategory: (state, action) => {
      if (state.plannedExpenses.length > 0) {
        const indexOfPlannedExpense = state.plannedExpenses.findIndex(
          (item) => item.catId === action.payload.catId
        );
        state.plannedExpenses[indexOfPlannedExpense] = {
          ...state.plannedExpenses[indexOfPlannedExpense],
          name: action.payload.name,
          iconName: action.payload.iconName,
        };
      } else {
        return;
      }
    },
    deleteAllExpensesFromCategory: (state, action) => {
      state.plannedExpenses = state.plannedExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.monthCategoriesExpenses = state.monthCategoriesExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.weekCategoriesExpenses = state.weekCategoriesExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.weekExpenses = state.weekExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.monthExpenses = state.monthExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
    },
    updateWeekExpenses: (state, action) => {
      if (action.payload === "monthChange") {
        state.weekExpenses = [];
        state.weekCategoriesExpenses = [];
        state.weekExpensesUpdated = false;
      }
      if (action.payload) {
        state.weekExpenses = [];
        state.weekCategoriesExpenses = [];
        state.weekExpensesUpdated = action.payload;
      }
      if (!action.payload) {
        state.weekExpensesUpdated = action.payload;
      }
    },
    updateMonth: (state) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      const monthToSet = new Date(state.monthExpenses[0].date).getMonth();
      const randLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );
      const sumOfAllExpenses = state.monthCategoriesExpenses
        .map((item) => Number(item.sum))
        .reduce((partialSum, a) => partialSum + a, 0);
      if (state.yearExpenses.length === 0) {
        state.yearExpenses = [
          {
            month: monthToSet,
            sumOfAllExpenses: sumOfAllExpenses,
            categoriesExpenses: state.monthCategoriesExpenses.map((item) => ({
              catId: item.catId,
              sum: item.sum,
              stillExsists: true,
            })),
          },
        ];
        state.monthExpenses = [];
      } else if (state.yearExpenses.length > 0) {
        state.yearExpenses = [
          ...state.yearExpenses,
          {
            month: monthToSet,
            sumOfAllExpenses: sumOfAllExpenses,
            categoriesExpenses: state.monthCategoriesExpenses.map((item) => ({
              catId: item.catId,
              sum: item.sum,
              stillExsists: true,
            })),
          },
        ];
        state.monthExpenses = [];
      }
      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca
      if (new Date(dateCheck).getFullYear() > state.curentYear) {
        // const yearToSet = new Date().getFullYear();
        const yearToSet = new Date(dateCheck).getFullYear() - 1;
        if (state.yearExpenses.length > 0) {
          const sumOfAllExpenses = state.yearExpenses
            .map((item) => Number(item.sumOfAllExpenses))
            .reduce((partialSum, a) => partialSum + a, 0);
          if (
            state.yearsExpenses.length === 0 ||
            state.yearsExpenses === undefined
          ) {
            state.yearsExpenses = [
              {
                year: yearToSet,
                sumOfAllExpenses: sumOfAllExpenses,
                months: state.yearExpenses,
              },
            ];
          } else if (state.yearsExpenses.length > 0) {
            state.yearsExpenses = [
              ...state.yearsExpenses,
              {
                year: yearToSet,
                sumOfAllExpenses: sumOfAllExpenses,
                months: state.yearExpenses,
              },
            ];
          }
          state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
            (item) => ({
              catId: item.catId,
              sum: 0,
              // date: new Date().toJSON(),
            })
          );
          const randLetter = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
          state.monthExpenses = [];
          state.weekExpenses = [];
          state.weekCategoriesExpenses = [];
          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          state.yearExpenses = [];
        }
        state.curentYear = new Date(dateCheck).getFullYear();
      } else {
        state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
          (item) => ({
            catId: item.catId,
            sum: 0,
            // date: new Date().toJSON(),
          })
        );
      }
    },
    setCurrentYear: (state) => {
      state.curentYear = new Date(dateCheck).getFullYear();
    },
  },
});
export const setExpense = expensesSlice.actions.setExpense;
export const addExpense = expensesSlice.actions.addExpense;
export const setPlannedExpense = expensesSlice.actions.setPlannedExpense;
export const addPlannedExpense = expensesSlice.actions.addPlannedExpense;
export const deleteAllExpensesFromCategory =
  expensesSlice.actions.deleteAllExpensesFromCategory;
export const updatePlannedExpenseCategory =
  expensesSlice.actions.updatePlannedExpenseCategory;
export const updateWeekExpenses = expensesSlice.actions.updateWeekExpenses;
export const updateMonthExpenses = expensesSlice.actions.updateMonth;
export const setCurrentYearExpenses = expensesSlice.actions.setCurrentYear;
export default expensesSlice.reducer;
