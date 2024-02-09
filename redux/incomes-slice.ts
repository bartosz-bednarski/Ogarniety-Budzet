import { createSlice } from "@reduxjs/toolkit";
import { IncomesInitialState } from "../types/incomes";
//TEST
// const dateCheck = "2025-03-15T08:06:22.626Z";
//TEST
// const incomesInitialState: IncomesInitialState = {
//   categoriesIncomes: [],
//   yearIncomes: [],
//   yearsIncomes: [],
//   curentYear: new Date(dateCheck).getFullYear(),
// };
const incomesInitialState: IncomesInitialState = {
  categoriesIncomes: [],
  yearIncomes: [],
  yearsIncomes: [],
  curentYear: new Date().getFullYear(),
};

const incomesSlice = createSlice({
  name: "incomes",
  initialState: incomesInitialState,
  reducers: {
    setIncome: (state, action) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      if (state.categoriesIncomes.length === 0) {
        state.categoriesIncomes = [
          //TEST
          // {
          //   catId: action.payload.catId,
          //   date: dateCheck,
          //   dateString: fullDate,
          //   value: 0,
          // },
          {
            catId: action.payload.catId,
            date: new Date().toJSON(),
            dateString: fullDate,
            value: 0,
          },
        ];
      } else if (state.categoriesIncomes.length > 0) {
        state.categoriesIncomes = [
          ...state.categoriesIncomes,
          //TEST
          // {
          //   catId: action.payload.catId,
          //   date: dateCheck,
          //   dateString: fullDate,
          //   value: 0,
          // },
          {
            catId: action.payload.catId,
            date: new Date().toJSON(),
            dateString: fullDate,
            value: 0,
          },
        ];
      }
    },
    updateIncome: (state, action) => {
      if (state.categoriesIncomes.length > 0) {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const fullDate = `${day}.${month}.${year}`;
        const indexOfIncome = state.categoriesIncomes.findIndex(
          (item) => item.catId === action.payload.catId
        );
        //TEST
        // state.categoriesIncomes[indexOfIncome] = {
        //   ...state.categoriesIncomes[indexOfIncome],
        //   date: dateCheck,
        //   dateString: fullDate,
        //   value: action.payload.value,
        // };
        state.categoriesIncomes[indexOfIncome] = {
          ...state.categoriesIncomes[indexOfIncome],
          date: new Date().toJSON(),
          dateString: fullDate,
          value: action.payload.value,
        };
      } else {
        return;
      }
    },
    deleteIncome: (state, action) => {
      state.categoriesIncomes = state.categoriesIncomes.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.yearIncomes = state.yearIncomes.map((categories) => ({
        month: categories.month,
        sumOfAllIncomes: categories.sumOfAllIncomes,
        categoriesIncomes: categories.categoriesIncomes.map((item) => ({
          catId: item.catId,
          value: item.value,
          stillExsists: item.catId === action.payload.catId ? false : true,
        })),
      }));
    },
    updateMonth: (state) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      const monthToSet = new Date(state.categoriesIncomes[0].date).getMonth();
      const sumOfAllIncomes = state.categoriesIncomes
        .map((item) => Number(item.value))
        .reduce((partialSum, a) => partialSum + a, 0);
      //dodaj nowy miesiac z danymi z miesiaca do tablicy
      //jezeli tablica z msc jest pusta dodajemy nowy miesiac, jezeli nie to robimy spread pozostalych i dodajemy nowy
      if (state.yearIncomes.length === 0) {
        state.yearIncomes = [
          {
            month: monthToSet,
            sumOfAllIncomes: sumOfAllIncomes,
            categoriesIncomes: state.categoriesIncomes.map((item) => ({
              catId: item.catId,
              value: item.value,
              stillExsists: true,
            })),
          },
        ];
      } else if (state.yearIncomes.length > 0) {
        state.yearIncomes = [
          ...state.yearIncomes,
          {
            month: monthToSet,
            sumOfAllIncomes: sumOfAllIncomes,
            categoriesIncomes: state.categoriesIncomes.map((item) => ({
              catId: item.catId,
              value: item.value,
              stillExsists: true,
            })),
          },
        ];
      }
      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca

      //TEST
      // if (new Date(dateCheck).getFullYear() > state.curentYear) {
      //   const yearToSet = new Date(dateCheck).getFullYear() - 1;
      if (new Date().getFullYear() > state.curentYear) {
        const yearToSet = new Date().getFullYear() - 1;
        if (state.yearIncomes.length > 0) {
          const sumOfAllIncomes = state.yearIncomes
            .map((item) => Number(item.sumOfAllIncomes))
            .reduce((partialSum, a) => partialSum + a, 0);
          if (
            state.yearsIncomes.length === 0 ||
            state.yearsIncomes === undefined
          ) {
            state.yearsIncomes = [
              {
                year: yearToSet,
                sumOfAllIncomes: sumOfAllIncomes,
                months: state.yearIncomes,
              },
            ];
          } else if (state.yearsIncomes.length > 0) {
            state.yearsIncomes = [
              ...state.yearsIncomes,
              {
                year: yearToSet,
                sumOfAllIncomes: sumOfAllIncomes,
                months: state.yearIncomes,
              },
            ];
          }
          //TEST
          // state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
          //   catId: item.catId,
          //   date: dateCheck,
          //   dateString: fullDate,
          //   value: 0,
          // }));
          state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
            catId: item.catId,
            date: new Date().toJSON(),
            dateString: fullDate,
            value: 0,
          }));
          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          state.yearIncomes = [];
        }
        //TEST
        // state.curentYear = new Date(dateCheck).getFullYear();
        state.curentYear = new Date().getFullYear();
      } else {
        //TEST
        // state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
        //   catId: item.catId,
        //   date: dateCheck,
        //   dateString: fullDate,
        //   value: 0,
        // }))
        state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
          catId: item.catId,
          date: new Date().toJSON(),
          dateString: fullDate,
          value: 0,
        }));
      }
    },
    setCurrentYear: (state) => {
      //TEST
      // state.curentYear = new Date(dateCheck).getFullYear();
      state.curentYear = new Date().getFullYear();
    },
  },
});

export const setIncome = incomesSlice.actions.setIncome;
export const updateIncome = incomesSlice.actions.updateIncome;
export const deleteIncome = incomesSlice.actions.deleteIncome;
export const updateMonthIncomes = incomesSlice.actions.updateMonth;
export const setCurrentYearIncomes = incomesSlice.actions.setCurrentYear;
export default incomesSlice.reducer;
