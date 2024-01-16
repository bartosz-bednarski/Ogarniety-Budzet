import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CategoryItem } from "../types/settings";

type ExpensesCategoriesInitialStateType = {
  categoriesList: CategoryItem[];
};
const expensesCategoriesInitialState: ExpensesCategoriesInitialStateType = {
  categoriesList: [
    {
      catId: "#DIFFEXPENSES",
      iconName: "star",
      name: "Inne",
    },
  ],
};

const expensesCategoriesSlice = createSlice({
  name: "categories",
  initialState: expensesCategoriesInitialState,
  reducers: {
    addExpensesCategory: (state, action) => {
      const newCategory = {
        catId: action.payload.catId,
        name: action.payload.name,
        iconName: action.payload.iconName,
      };

      if (state.categoriesList.length > 0 && state.categoriesList.length < 20) {
        state.categoriesList = [...state.categoriesList, newCategory];
      } else if (state.categoriesList.length === 0) {
        state.categoriesList = [newCategory];
      }
    },
    editExpensesCategory: (state, action) => {
      if (state.categoriesList.length > 0) {
        const indexOfCategory = state.categoriesList.findIndex(
          (item) => item.catId === action.payload.catId
        );
        state.categoriesList[indexOfCategory] = action.payload;
      } else {
        return;
      }
    },
    deleteExpensesCategory: (state, action) => {
      state.categoriesList = state.categoriesList.filter(
        (item) => item.catId !== action.payload.catId
      );
    },
  },
});

export const categoriesActions = expensesCategoriesSlice.actions;
export const addExpensesCategory =
  expensesCategoriesSlice.actions.addExpensesCategory;
export const editExpensesCategory =
  expensesCategoriesSlice.actions.editExpensesCategory;
export const deleteExpensesCategory =
  expensesCategoriesSlice.actions.deleteExpensesCategory;
export default expensesCategoriesSlice.reducer;
