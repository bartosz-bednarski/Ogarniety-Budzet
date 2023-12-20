import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CategoryItem } from "../types/settings";

type categoriesInitialState = {
  categoriesList: CategoryItem[] | any[];
};
const categoriesInitialState = {
  categoriesList: [
    // { catId: 0, name: "Book", iconName: "ios-add" },
    { catId: 0, name: "Jedzenie", iconName: "restaurant-outline" },
    // { catId: 2, name: "Travel", iconName: "ios-battery-full" },
    // { catId: 3, name: "Technology", iconName: "ios-basketball" },
    // { catId: 4, name: "Music", iconName: "ios-cloudy-night" },
    // { catId: 5, name: "Sports", iconName: "ios-desktop" },
    // { catId: 6, name: "Fashion", iconName: "ios-desktop" },
    // { catId: 7, name: "Art", iconName: "ios-flask" },
    // { catId: 8, name: "Health", iconName: "ios-globe" },
    // { catId: 9, name: "Movies", iconName: "ios-happy" },
    // { catId: 10, name: "Food", iconName: "ios-alarm" },
    // { catId: 11, name: "Travel", iconName: "ios-battery-full" },
    // { catId: 12, name: "Technology", iconName: "ios-basketball" },
    // { catId: 13, name: "Music", iconName: "ios-cloudy-night" },
    // { catId: 14, name: "Sports", iconName: "ios-desktop" },
    // { catId: 15, name: "Fashion", iconName: "ios-desktop" },
    // { catId: 16, name: "Art", iconName: "ios-flask" },
    // { catId: 17, name: "Health", iconName: "ios-globe" },
    // { catId: 18, name: "Movies", iconName: "ios-happy" },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesInitialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        catId: state.categoriesList.length,
        name: action.payload.name,
        iconName: action.payload.iconName,
      };
      if (state.categoriesList.length > 0) {
        state.categoriesList = [...state.categoriesList, newCategory];
      } else {
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
  },
});

export const categoriesActions = categoriesSlice.actions;
export const addCategory = categoriesSlice.actions.addCategory;
export const editCategory = categoriesSlice.actions.editCategory;
export const selectCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
