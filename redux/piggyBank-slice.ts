import { createSlice } from "@reduxjs/toolkit";

const piggyBankInitialState = {
  bankAccountStatus: 0,
  finantialTargets: [{}],
};

const piggyBankSlice = createSlice({
  name: "piggyBank",
  initialState: piggyBankInitialState,
  reducers: {
    setBankAccountStatus: (state, action) => {
      state.bankAccountStatus = action.payload;
    },
  },
});

export const setBankAccountStatus = piggyBankSlice.actions.setBankAccountStatus;
export default piggyBankSlice.reducer;
