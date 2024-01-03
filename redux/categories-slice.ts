import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CategoryItem } from "../types/settings";

type categoriesInitialStateType = {
  categoriesList: CategoryItem[];
};
const categoriesInitialState: categoriesInitialStateType = {
  categoriesList: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesInitialState,
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
        state.categoriesList[action.payload.catId] = action.payload;
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

export const categoriesActions = categoriesSlice.actions;
export const addCategory = categoriesSlice.actions.addCategory;
export const editCategory = categoriesSlice.actions.editCategory;
export const deleteCategory = categoriesSlice.actions.deleteCategory;
export default categoriesSlice.reducer;
