import { createSlice } from "@reduxjs/toolkit";

type IncomesInitialState = {
  categoriesIncomes: {
    catId: string;
    date: string;
    dateString: string;
    value: number;
  }[];
  yearIncomes: {
    month: number;
    sumOfAllIncomes: number;
    categoriesIncomes: {
      catId: string;
      value: number;
      stillExsists: boolean;
    }[];
  }[];
  yearsIncomes: {
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
  curentYear: number;
};
const dateCheck = "2027-05-26T08:06:22.626Z";
const incomesInitialState: IncomesInitialState = {
  categoriesIncomes: [],
  yearIncomes: [],
  yearsIncomes: [],
  curentYear: new Date(dateCheck).getFullYear(),
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
          {
            catId: action.payload.catId,
            // date: new Date().toJSON(),
            date: dateCheck,
            dateString: fullDate,
            value: 0,
          },
        ];
      } else if (state.categoriesIncomes.length > 0) {
        state.categoriesIncomes = [
          ...state.categoriesIncomes,
          {
            catId: action.payload.catId,
            // date: new Date().toJSON(),
            date: dateCheck,
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
        state.categoriesIncomes[indexOfIncome] = {
          ...state.categoriesIncomes[indexOfIncome],
          // date: new Date().toJSON(),
          date: dateCheck,
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
        console.log("REDUX!!!!", state.yearIncomes);
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
      console.log("REDUX", state.curentYear);
      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca
      if (new Date(dateCheck).getFullYear() > state.curentYear) {
        console.log("REDUX", state.curentYear);
        // const yearToSet = new Date().getFullYear();
        const yearToSet = new Date(dateCheck).getFullYear() - 1;
        if (state.yearIncomes.length > 0) {
          const sumOfAllIncomes = state.yearIncomes
            .map((item) => Number(item.sumOfAllIncomes))
            .reduce((partialSum, a) => partialSum + a, 0);
          if (
            state.yearsIncomes.length === 0 ||
            state.yearsIncomes === undefined
          ) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
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
          state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
            catId: item.catId,
            // date: new Date().toJSON(),
            date: dateCheck,
            dateString: fullDate,
            value: 0,
          }));
          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          state.yearIncomes = [];
        }
        state.curentYear = new Date(dateCheck).getFullYear();
      } else {
        state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
          catId: item.catId,
          // date: new Date().toJSON(),
          date: dateCheck,
          dateString: fullDate,
          value: 0,
        }));
      }
    },
    setCurrentYear: (state) => {
      state.curentYear = new Date(dateCheck).getFullYear();
    },
  },
});

export const setIncome = incomesSlice.actions.setIncome;
export const updateIncome = incomesSlice.actions.updateIncome;
export const deleteIncome = incomesSlice.actions.deleteIncome;
export const updateMonth = incomesSlice.actions.updateMonth;
export const setCurrentYearIncomes = incomesSlice.actions.setCurrentYear;
export default incomesSlice.reducer;
