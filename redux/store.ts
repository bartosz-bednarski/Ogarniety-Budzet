import { configureStore } from "@reduxjs/toolkit";
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
import categoriesSlice from "./categories-slice";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedPodsumowanieReducer = persistReducer(
  persistConfig,
  podsumowanieSlice
);
const persistedCategoriesReducer = persistReducer(
  persistConfig,
  categoriesSlice
);
export const store = configureStore({
  reducer: {
    podsumowanie: persistedPodsumowanieReducer,
    categories: persistedCategoriesReducer,
  },
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
