import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const podsumowanieInitialState = { name: "" };

const podsumowanieSlice = createSlice({
  name: "podsumowanie",
  initialState: podsumowanieInitialState,
  reducers: {
    addBasic: (state, action) => {
      state.name = "Adam";
    },
  },
});
export const podsumowanieActions = podsumowanieSlice.actions;
export const selectPodsumowanie = (state: RootState) => state.podsumowanie;
export default podsumowanieSlice.reducer;
