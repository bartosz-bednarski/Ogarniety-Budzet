import { createSlice } from "@reduxjs/toolkit";

const currencyInitialState = {
  currentCurrency: {
    currencyCode: "PLN",
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState: currencyInitialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currentCurrency.currencyCode = action.payload;
    },
  },
});

export const setCurrency = currencySlice.actions.setCurrency;
export default currencySlice.reducer;
