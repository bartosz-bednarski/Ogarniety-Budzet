import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CategoryItem } from "../types/settings";

type ExpensesCategoriesInitialStateType = {
  categoriesList: CategoryItem[];
};
const expensesCategoriesInitialState: ExpensesCategoriesInitialStateType = {
  categoriesList: [],
};

const expensesCategoriesSlice = createSlice({
  name: "categories",
  initialState: expensesCategoriesInitialState,
  reducers: {
    addCategory: (state, action) => {
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
    editCategory: (state, action) => {
      if (state.categoriesList.length > 0) {
        const indexOfCategory = state.categoriesList.findIndex(
          (item) => item.catId === action.payload.catId
        );
        state.categoriesList[indexOfCategory] = action.payload;
      } else {
        return;
      }
    },
    deleteCategory: (state, action) => {
      state.categoriesList = state.categoriesList.filter(
        (item) => item.catId !== action.payload.catId
      );
    },
  },
});

export const categoriesActions = expensesCategoriesSlice.actions;
export const addCategory = expensesCategoriesSlice.actions.addCategory;
export const editCategory = expensesCategoriesSlice.actions.editCategory;
export const deleteCategory = expensesCategoriesSlice.actions.deleteCategory;
export default expensesCategoriesSlice.reducer;
