import { createSlice } from "@reduxjs/toolkit";

type MonthSavings = { month: string; savings: Number };
type YearSavings = {
  year: number;
  sumOfSavings: number;
  months: MonthSavings[];
};
type PiggyBankInitialState = {
  bankAccountStatus: number;
  finantialTargets: {}[];
  yearSavings: MonthSavings[];
  yearsSavings: YearSavings[];
};
const piggyBankInitialState: PiggyBankInitialState = {
  bankAccountStatus: 0,
  finantialTargets: [{}],
  yearSavings: [],
  yearsSavings: [],
};
const dateCheck = "2025-05-10T08:06:22.626Z";
const piggyBankSlice = createSlice({
  name: "piggyBank",
  initialState: piggyBankInitialState,
  reducers: {
    setBankAccountStatus: (state, action) => {
      state.bankAccountStatus = action.payload;
      state.yearSavings = [];
    },
    updateMonth: (state, action) => {
      state.bankAccountStatus =
        Number(state.bankAccountStatus) + Number(action.payload.savings);
      if (state.yearSavings.length === 0) {
        state.yearSavings = [
          {
            month: action.payload.month,
            savings: action.payload.savings,
          },
        ];
      } else if (state.yearSavings.length > 0) {
        state.yearSavings = [
          ...state.yearSavings,
          {
            month: action.payload.month,
            savings: action.payload.savings,
          },
        ];
      }
      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca
      if (new Date(dateCheck).getMonth() === 0) {
        // const yearToSet = new Date().getFullYear();
        const yearToSet = new Date(dateCheck).getFullYear() - 1;
        if (state.yearSavings.length > 0) {
          const sumOfSavings = state.yearSavings
            .map((item) => Number(item.savings))
            .reduce((partialSum, a) => partialSum + a, 0);
          if (
            state.yearsSavings.length === 0 ||
            state.yearsSavings === undefined
          ) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
            state.yearsSavings = [
              {
                year: yearToSet,
                sumOfSavings: sumOfSavings,
                months: state.yearSavings,
              },
            ];
          } else if (state.yearsSavings.length > 0) {
            state.yearsSavings = [
              ...state.yearsSavings,
              {
                year: yearToSet,
                sumOfSavings: sumOfSavings,
                months: state.yearSavings,
              },
            ];
          }

          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          state.yearSavings = [];
        }
      }
    },
  },
});

export const setBankAccountStatus = piggyBankSlice.actions.setBankAccountStatus;
export const updateMonthPiggyBank = piggyBankSlice.actions.updateMonth;
export default piggyBankSlice.reducer;
