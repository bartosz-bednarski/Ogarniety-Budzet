import { createSlice } from "@reduxjs/toolkit";
import { PiggyBankInitialState } from "../types/piggyBank";

//TEST
// const dateCheck = "2025-03-15T08:06:22.626Z";
//TEST
// const piggyBankInitialState: PiggyBankInitialState = {
//   bankAccountStatus: 0,
//   finantialTargets: [],
//   yearSavings: [],
//   yearsSavings: [],
//   realisedTargets: [],
//   curentYear: new Date(dateCheck).getFullYear(),
// };
const piggyBankInitialState: PiggyBankInitialState = {
  // bankAccountStatus: 0,
  finantialTargets: [],
  // yearSavings: [],
  // yearsSavings: [],
  realisedTargets: [],
  curentYear: new Date().getFullYear(),
};
const piggyBankSlice = createSlice({
  name: "piggyBank",
  initialState: piggyBankInitialState,
  reducers: {
    setFinantialTarget: (state, action) => {
      state.finantialTargets = [
        ...state.finantialTargets,
        {
          name: action.payload.name,
          iconName: action.payload.iconName,
          targetValue: Number(action.payload.targetValue),
          id: action.payload.id,
          currency: action.payload.currency,
          incomes: [
            //TEST
            // {
            //   dateMonth: new Date(dateCheck).getMonth(),
            //   value: 0,
            //   id: action.payload.incomeId,
            // },
            {
              dateMonth: new Date().getMonth(),
              value: 0,
              id: action.payload.incomeId,
              bankAccountId: action.payload.bankAccountId,
            },
          ],
        },
      ];
    },
    addValueToFinantialTarget: (state, action) => {
      const indexOfTarget = state.finantialTargets.findIndex(
        (item) => item.id === action.payload.id
      );
      state.finantialTargets[indexOfTarget].incomes = [
        ...state.finantialTargets[indexOfTarget].incomes,
        //TEST
        // {
        //   dateMonth: new Date(dateCheck).getMonth(),
        //   value: Number(action.payload.value),
        //   id: action.payload.incomeId,
        // },
        {
          dateMonth: new Date().getMonth(),
          value: Number(action.payload.value),
          id: action.payload.incomeId,
          bankAccountId: action.payload.bankAccountId,
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
    deleteFinantialTargetIncomesOnAccountDelete: (state, action) => {
      state.finantialTargets = state.finantialTargets.map((item) => ({
        ...item,
        incomes: item.incomes.filter(
          (income) => income.bankAccountId !== action.payload.bankAccountId
        ),
      }));
    },
    setTargetRealised: (state, action) => {
      if (state.realisedTargets === undefined) {
        state.realisedTargets = [
          //TEST
          // {
          //   name: action.payload.name,
          //   iconName: action.payload.iconName,
          //   targetValue: Number(action.payload.targetValue),
          //   id: action.payload.id,
          //   dateMonth: new Date(dateCheck).getMonth(),
          // },
          {
            name: action.payload.name,
            iconName: action.payload.iconName,
            targetValue: Number(action.payload.targetValue),
            id: action.payload.id,
            dateMonth: new Date().getMonth(),
            incomes:
              state.finantialTargets[
                state.finantialTargets.findIndex(
                  (item) => item.id === action.payload.id
                )
              ].incomes,
          },
        ];
        state.finantialTargets = state.finantialTargets.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.realisedTargets = [
          ...state.realisedTargets,
          //TEST
          // {
          //   name: action.payload.name,
          //   iconName: action.payload.iconName,
          //   targetValue: Number(action.payload.targetValue),
          //   id: action.payload.id,
          //   dateMonth: new Date(dateCheck).getMonth(),
          // },
          {
            name: action.payload.name,
            iconName: action.payload.iconName,
            targetValue: Number(action.payload.targetValue),
            id: action.payload.id,
            dateMonth: new Date().getMonth(),
            incomes:
              state.finantialTargets[
                state.finantialTargets.findIndex(
                  (item) => item.id === action.payload.id
                )
              ].incomes,
          },
        ];
        state.finantialTargets = state.finantialTargets.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    setCurrentYear: (state) => {
      //TEST
      // state.curentYear = new Date(dateCheck).getFullYear();
      state.curentYear = new Date().getFullYear();
    },
  },
});

export const setFinantialTarget = piggyBankSlice.actions.setFinantialTarget;
export const addValueToFinantialTarget =
  piggyBankSlice.actions.addValueToFinantialTarget;
export const editFinantialTargetValue =
  piggyBankSlice.actions.editFinantialTargetValue;
export const deleteFinantialTarget =
  piggyBankSlice.actions.deleteFinantialTarget;
export const setTargetRealised = piggyBankSlice.actions.setTargetRealised;
export const setCurrentYearPiggyBank = piggyBankSlice.actions.setCurrentYear;
export const deleteFinantialTargetIncomesOnAccountDelete =
  piggyBankSlice.actions.deleteFinantialTargetIncomesOnAccountDelete;
export default piggyBankSlice.reducer;
