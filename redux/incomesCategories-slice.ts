import { createSlice } from "@reduxjs/toolkit";
import { IncomesCategoriesInitialState } from "../types/incomes";

const incomesCategoriesInitialState: IncomesCategoriesInitialState = {
  categoriesList: [],
};

const incomesCategoriesSlice = createSlice({
  name: "incomes",
  initialState: incomesCategoriesInitialState,
  reducers: {
    addIncomesCategory: (state, action) => {
      const newCategory = {
        catId: action.payload.catId,
        name: action.payload.name,
        iconName: action.payload.iconName,
      };

      if (state.categoriesList.length > 0 && state.categoriesList.length < 10) {
        state.categoriesList = [...state.categoriesList, newCategory];
      } else if (state.categoriesList.length === 0) {
        state.categoriesList = [newCategory];
      }
    },
    editIncomesCategory: (state, action) => {
      if (state.categoriesList.length > 0) {
        const indexOfCategory = state.categoriesList.findIndex(
          (item) => item.catId === action.payload.catId
        );
        state.categoriesList[indexOfCategory] = action.payload;
      } else {
        return;
      }
    },
    deleteIncomesCategory: (state, action) => {
      state.categoriesList = state.categoriesList.filter(
        (item) => item.catId !== action.payload.catId
      );
    },
  },
});

export const incomesCategoriesActions = incomesCategoriesSlice.actions;
export const addIncomesCategory =
  incomesCategoriesSlice.actions.addIncomesCategory;
export const editIncomesCategory =
  incomesCategoriesSlice.actions.editIncomesCategory;
export const deleteIncomesCategory =
  incomesCategoriesSlice.actions.deleteIncomesCategory;
export default incomesCategoriesSlice.reducer;
