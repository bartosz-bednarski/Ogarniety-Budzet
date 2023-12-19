import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CategoryItem } from "../types/settings";

type categoriesInitialState = {
  categoriesList: CategoryItem[];
};
const categoriesInitialState = {
  categoriesList: [
    { catId: 0, name: "Book", iconName: "ios-add" },
    { catId: 1, name: "Food", iconName: "ios-alarm" },
    { catId: 2, name: "Travel", iconName: "ios-battery-full" },
    { catId: 3, name: "Technology", iconName: "ios-basketball" },
    { catId: 4, name: "Music", iconName: "ios-cloudy-night" },
    { catId: 5, name: "Sports", iconName: "ios-desktop" },
    { catId: 6, name: "Fashion", iconName: "ios-desktop" },
    { catId: 7, name: "Art", iconName: "ios-flask" },
    { catId: 8, name: "Health", iconName: "ios-globe" },
    { catId: 9, name: "Movies", iconName: "ios-happy" },
    { catId: 10, name: "Food", iconName: "ios-alarm" },
    { catId: 12, name: "Travel", iconName: "ios-battery-full" },
    { catId: 13, name: "Technology", iconName: "ios-basketball" },
    { catId: 14, name: "Music", iconName: "ios-cloudy-night" },
    { catId: 15, name: "Sports", iconName: "ios-desktop" },
    { catId: 16, name: "Fashion", iconName: "ios-desktop" },
    { catId: 17, name: "Art", iconName: "ios-flask" },
    { catId: 18, name: "Health", iconName: "ios-globe" },
    { catId: 19, name: "Movies", iconName: "ios-happy" },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesInitialState,
  reducers: {
    addCategory: (state, action) => {
      state.categoriesList = [...state.categoriesList, action.payload];
    },
  },
});

export const categoriesActions = categoriesSlice.actions;
export const addCategory = categoriesSlice.actions.addCategory;
export const selectCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
