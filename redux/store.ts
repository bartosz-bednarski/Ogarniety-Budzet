import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import podsumowanieSlice from "./podsumowanie-slice";
import categoriesSlice from "./expensesCategories-slice";
import expensesCategoriesSlice from "./expenses-slice";
import incomesCategoriesSlice from "./incomesCategories-slice";
import incomesSlice from "./incomes-slice";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  podsumowanie: podsumowanieSlice,
  categories: categoriesSlice,
  expenses: expensesCategoriesSlice,
  incomesCategories: incomesCategoriesSlice,
  incomes: incomesSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedPodsumowanieReducer = persistReducer(
//   persistConfig,
//   podsumowanieSlice
// );
// const persistedCategoriesReducer = persistReducer(
//   persistConfig,
//   categoriesSlice
// );

// const persistedExpensesReducer = persistReducer(persistConfig, expensesSlice);
export const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   podsumowanie: persistedPodsumowanieReducer,
  //   categories: persistedCategoriesReducer,
  //   expenses: persistedExpensesReducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
