import { createSlice } from "@reduxjs/toolkit";
type ExpensesInitialState = {
  lastExpenses: { catId: number; value: number; date: string }[];
  categoriesExpenses: { catId: number; sum: number }[];
};
const expensesInitialState: ExpensesInitialState = {
  lastExpenses: [{ catId: 100, value: 100, date: "12.09.2023" }],
  categoriesExpenses: [],
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesInitialState,
  reducers: {
    addExpense: (state, action) => {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month},${year}`;
      state.lastExpenses = [
        ...state.lastExpenses,
        {
          catId: action.payload.catId,
          value: action.payload.value,
          date: fullDate,
        },
      ];
      // Update do sum wydatków w poszczególnych kategoriach:
      // sprawdzenie czy catId dodanego wydatku istnieje?
      // znajdujemy index catId i dodajemy wartość do sumy:
      // tworzymy nowy object w array z wartoscią sum = action.payload.value
      const catIdExists = state.categoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);

      if (catIdExists) {
        const categoryId = state.categoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndex = state.categoriesExpenses.indexOf(categoryId!);
        state.categoriesExpenses[categoryIndex].sum = state.categoriesExpenses[
          categoryIndex
        ].sum += Number(action.payload.value);
      } else {
        state.categoriesExpenses = [
          ...state.categoriesExpenses,
          { catId: action.payload.catId, sum: Number(action.payload.value) },
        ];
      }
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export default expensesSlice.reducer;
