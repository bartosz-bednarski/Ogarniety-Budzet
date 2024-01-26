import { createSlice } from "@reduxjs/toolkit";
import { PiggyBankInitialState } from "../types/piggyBank";
const dateCheck = "2027-05-26T08:06:22.626Z";
const piggyBankInitialState: PiggyBankInitialState = {
  bankAccountStatus: 0,
  finantialTargets: [],
  yearSavings: [],
  yearsSavings: [],
  realisedTargets: [],
  curentYear: new Date(dateCheck).getFullYear(),
};

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
      if (new Date(dateCheck).getFullYear() > state.curentYear) {
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
        state.curentYear = new Date(dateCheck).getFullYear();
      }
    },
    setFinantialTarget: (state, action) => {
      state.finantialTargets = [
        ...state.finantialTargets,
        {
          name: action.payload.name,
          iconName: action.payload.iconName,
          targetValue: Number(action.payload.targetValue),
          id: action.payload.id,
          incomes: [
            {
              dateMonth: new Date(dateCheck).getMonth(),
              value: 0,
              id: action.payload.incomeId,
            },
          ],
        },
      ];
    },
    addValueToFinantialTarget: (state, action) => {
      const indexOfTarget = state.finantialTargets.findIndex(
        (item) => item.id === action.payload.id
      );
      // state.finantialTargets[indexOfTarget].incomes = [
      //   {
      //     dateMonth: new Date(dateCheck).getMonth(),
      //     value: 0,
      //     id: action.payload.incomeId,
      //   },
      // ];
      state.finantialTargets[indexOfTarget].incomes = [
        ...state.finantialTargets[indexOfTarget].incomes,
        {
          dateMonth: new Date(dateCheck).getMonth(),
          value: Number(action.payload.value),
          id: action.payload.incomeId,
        },
      ];
    },
    editFinantialTargetValue: (state, action) => {
      const indexOfTarget = state.finantialTargets.findIndex(
        (item) => item.id === action.payload.id
      );
      state.finantialTargets[indexOfTarget].targetValue =
        action.payload.targetValue;
    },
    deleteFinantialTarget: (state, action) => {
      state.finantialTargets = state.finantialTargets.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setTargetRealised: (state, action) => {
      if (state.realisedTargets === undefined) {
        state.realisedTargets = [
          {
            name: action.payload.name,
            iconName: action.payload.iconName,
            targetValue: Number(action.payload.targetValue),
            id: action.payload.id,
            dateMonth: new Date(dateCheck).getMonth(),
          },
        ];
        state.finantialTargets = state.finantialTargets.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.realisedTargets = [
          ...state.realisedTargets,
          {
            name: action.payload.name,
            iconName: action.payload.iconName,
            targetValue: Number(action.payload.targetValue),
            id: action.payload.id,
            dateMonth: new Date(dateCheck).getMonth(),
          },
        ];
        state.finantialTargets = state.finantialTargets.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    setCurrentYear: (state) => {
      state.curentYear = new Date(dateCheck).getFullYear();
    },
  },
});

export const setBankAccountStatus = piggyBankSlice.actions.setBankAccountStatus;
export const updateMonthPiggyBank = piggyBankSlice.actions.updateMonth;
export const setFinantialTarget = piggyBankSlice.actions.setFinantialTarget;
export const addValueToFinantialTarget =
  piggyBankSlice.actions.addValueToFinantialTarget;
export const editFinantialTargetValue =
  piggyBankSlice.actions.editFinantialTargetValue;
export const deleteFinantialTarget =
  piggyBankSlice.actions.deleteFinantialTarget;
export const setTargetRealised = piggyBankSlice.actions.setTargetRealised;
export const setCurrentYearPiggyBank = piggyBankSlice.actions.setCurrentYear;
export default piggyBankSlice.reducer;
