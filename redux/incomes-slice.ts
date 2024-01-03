import { createSlice } from "@reduxjs/toolkit";

type IncomesInitialState = {
  categoriesIncomes: {
    catId: string;
    date: string;
    dateString: string;
    value: number;
  }[];
};

const incomesInitialState: IncomesInitialState = {
  categoriesIncomes: [],
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
            date: new Date().toJSON(),
            dateString: fullDate,
            value: 0,
          },
        ];
      } else if (state.categoriesIncomes.length > 0) {
        state.categoriesIncomes = [
          ...state.categoriesIncomes,
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
    },
  },
});

export const setIncome = incomesSlice.actions.setIncome;
export const updateIncome = incomesSlice.actions.updateIncome;
export const deleteIncome = incomesSlice.actions.deleteIncome;
export default incomesSlice.reducer;
