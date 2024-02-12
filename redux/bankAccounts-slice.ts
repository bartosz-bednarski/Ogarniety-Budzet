import { createSlice } from "@reduxjs/toolkit";
import { BankAccountsInitialState } from "../types/piggyBank";

const bankAccountsInitialState: BankAccountsInitialState = {
  accounts: [
    {
      accountName: "Rachunek 1",
      accountId: "0",
      currency: "PLN",
      bankAccountStatus: 0,
      yearSavings: [],
      yearsSavings: [],
      currentYear: new Date().getFullYear(),
    },
  ],
  activeAccount: { accountName: "Rachunek 1", accountId: "0", currency: "PLN" },
};

function randomId() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

const bankAccountsSlice = createSlice({
  name: "bankAccounts",
  initialState: bankAccountsInitialState,
  reducers: {
    setBankAccount: (state, action) => {
      const id = randomId();
      state.accounts = [
        {
          accountName: "Rachunek 1",
          accountId: id,
          currency: "PLN",
          bankAccountStatus: action.payload,
          yearSavings: [],
          yearsSavings: [],
          currentYear: new Date().getFullYear(),
        },
      ];
      state.activeAccount = {
        accountName: "Rachunek 1",
        accountId: id,
        currency: "PLN",
      };
    },
    updateMonth: (state, action) => {
      const toUpdate = state.accounts.filter(
        (item) => item.accountId === action.payload.accountId
      );
      toUpdate[0].bankAccountStatus =
        Number(toUpdate[0].bankAccountStatus) + Number(action.payload.savings);
      if (toUpdate[0].yearSavings.length === 0) {
        toUpdate[0].yearSavings = [
          {
            month: action.payload.month,
            savings: action.payload.savings,
          },
        ];
      } else if (toUpdate[0].yearSavings.length > 0) {
        toUpdate[0].yearSavings = [
          ...toUpdate[0].yearSavings,
          {
            month: action.payload.month,
            savings: action.payload.savings,
          },
        ];
      }
      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca

      //TEST
      // if (new Date(dateCheck).getFullYear() > state.curentYear) {
      //         const yearToSet = new Date(dateCheck).getFullYear() - 1;
      if (new Date().getFullYear() > toUpdate[0].currentYear) {
        const yearToSet = new Date().getFullYear() - 1;
        if (toUpdate[0].yearSavings.length > 0) {
          const sumOfSavings = toUpdate[0].yearSavings
            .map((item) => Number(item.savings))
            .reduce((partialSum, a) => partialSum + a, 0);
          if (
            toUpdate[0].yearsSavings.length === 0 ||
            toUpdate[0].yearsSavings === undefined
          ) {
            toUpdate[0].yearsSavings = [
              {
                year: yearToSet,
                sumOfSavings: sumOfSavings,
                months: toUpdate[0].yearSavings,
              },
            ];
          } else if (toUpdate[0].yearsSavings.length > 0) {
            toUpdate[0].yearsSavings = [
              ...toUpdate[0].yearsSavings,
              {
                year: yearToSet,
                sumOfSavings: sumOfSavings,
                months: toUpdate[0].yearSavings,
              },
            ];
          }

          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          toUpdate[0].yearSavings = [];
        }
        //TEST
        // state.curentYear = new Date(dateCheck).getFullYear();
        toUpdate[0].currentYear = new Date().getFullYear();
      }
      state.accounts = [
        toUpdate[0],
        ...state.accounts.filter((item) => item !== action.payload.accountId),
      ];
    },
    setCurrentYear: (state) => {
      //TEST
      // state.curentYear = new Date(dateCheck).getFullYear();
      state.accounts = state.accounts.map((item) => ({
        accountName: item.accountName,
        accountId: item.accountId,
        currency: item.currency,
        bankAccountStatus: item.bankAccountStatus,
        yearSavings: item.yearSavings,
        yearsSavings: item.yearsSavings,
        currentYear: new Date().getFullYear(),
      }));
    },
  },
});

export const setBankAccount = bankAccountsSlice.actions.setBankAccount;
export default bankAccountsSlice.reducer;
