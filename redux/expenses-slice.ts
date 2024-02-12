import { createSlice } from "@reduxjs/toolkit";
import { ExpensesInitialState } from "../types/expenses";

//TEST
// const dateCheck = "2025-03-15T08:06:22.626Z";

//TEST
// const expensesInitialState: ExpensesInitialState = {
//   weekExpenses: [],
//   weekCategoriesExpenses: [],
//   monthExpenses: [],
//   monthCategoriesExpenses: [],
//   yearExpenses: [],
//   yearsExpenses: [],
//   plannedExpenses: [],
//   dateToUpdateWeek: new Date().toDateString(),
//   currentMonth: new Date().getMonth(),
//   weekExpensesUpdated: true,
//   curentYear: new Date(dateCheck).getFullYear(),
// };

const expensesInitialState: ExpensesInitialState = {
  weekExpenses: [],
  weekCategoriesExpenses: [],
  monthExpenses: [],
  monthCategoriesExpenses: [],
  yearExpenses: [],
  yearsExpenses: [],
  plannedExpenses: [],
  dateToUpdateWeek: new Date().toDateString(),
  currentMonth: new Date().getMonth(),
  weekExpensesUpdated: true,
  curentYear: new Date().getFullYear(),
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesInitialState,
  reducers: {
    setExpense: (state, action) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      const randLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );

      state.monthCategoriesExpenses = [
        ...state.monthCategoriesExpenses,
        { catId: action.payload.catId, sum: 0, bankAccountId: "#Rachunek1" },
      ];

      state.weekCategoriesExpenses = [
        ...state.weekCategoriesExpenses,
        { catId: action.payload.catId, sum: 0, bankAccountId: "#Rachunek1" },
      ];

      state.weekExpenses = [
        ...state.weekExpenses,

        //TEST
        // {
        //   catId: action.payload.catId,
        //   value: 0,
        //   dateString: fullDate,
        //   date: dateCheck,
        //   id: randLetter + Date.now(),
        // },

        {
          catId: action.payload.catId,
          value: 0,
          dateString: fullDate,
          date: new Date().toJSON(),
          id: randLetter + Date.now(),
          bankAccountId: "#Rachunek1",
        },
      ];

      state.monthExpenses = [
        ...state.monthExpenses,

        //TEST
        // {
        //   catId: action.payload.catId,
        //   value: 0,
        //   dateString: fullDate,
        //   date: dateCheck,
        //   id: randLetter + Date.now(),
        // },

        {
          catId: action.payload.catId,
          value: 0,
          dateString: fullDate,
          date: new Date().toJSON(),
          id: randLetter + Date.now(),
          bankAccountId: "#Rachunek1",
        },
      ];
    },

    addExpense: (state, action) => {
      //DODAC ZERA W DACIE TO JEST OD STRIPOW

      //TEST
      // let day = new Date(dateCheck).getDate();
      // String(day).length===0?day = 0+day:day
      // let month = new Date(dateCheck).getMonth() + 1;
      // String(month).length===0?month = 0+month:month
      // const year = new Date(dateCheck).getFullYear();

      let day = new Date().getDate();
      String(day).length === 0 ? (day = 0 + day) : day;
      let month = new Date().getMonth() + 1;
      String(month).length === 0 ? (month = 0 + month) : month;
      const year = new Date().getFullYear();

      const fullDate = `${day}.${month}.${year}`;

      const randLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );

      state.weekExpenses = [
        ...state.weekExpenses,

        //TEST
        // {
        //   catId: action.payload.catId,
        //   value: action.payload.value,
        //   dateString: fullDate,
        //   date: dateCheck,
        //   id: randLetter + Date.now(),
        // },

        {
          catId: action.payload.catId,
          value: action.payload.value,
          dateString: fullDate,
          date: new Date().toJSON(),
          id: randLetter + Date.now(),
          bankAccountId: action.payload.bankAccountId,
        },
      ];

      state.monthExpenses = [
        ...state.monthExpenses,

        //TEST
        // {
        //   catId: action.payload.catId,
        //   value: action.payload.value,
        //   dateString: fullDate,
        //   date: dateCheck,
        //   id: randLetter + Date.now(),
        // },

        {
          catId: action.payload.catId,
          value: action.payload.value,
          dateString: fullDate,
          date: new Date().toJSON(),
          id: randLetter + Date.now(),
          bankAccountId: action.payload.bankAccountId,
        },
      ];

      // Update do sum wydatków w poszczególnych kategoriach:
      // sprawdzenie czy catId dodanego wydatku istnieje?
      // znajdujemy index catId i dodajemy wartość do sumy:
      // tworzymy nowy object w array z wartoscią sum = action.payload.value
      const catIdMonthExists = state.monthCategoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);
      const catIdWeekExists = state.weekCategoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);

      //tydzień
      if (catIdWeekExists) {
        const categoryIdWeek = state.weekCategoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndexWeek = state.weekCategoriesExpenses.indexOf(
          categoryIdWeek!
        );
        state.weekCategoriesExpenses[categoryIndexWeek].sum =
          state.weekCategoriesExpenses[categoryIndexWeek].sum += Number(
            action.payload.value
          );
      } else {
        state.weekCategoriesExpenses = [
          ...state.weekCategoriesExpenses,
          {
            catId: action.payload.catId,
            sum: Number(action.payload.value),
            bankAccountId: action.payload.bankAccountId,
          },
        ];
      }

      //miesiąc
      if (catIdMonthExists) {
        const categoryIdMonth = state.monthCategoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndexMonth = state.monthCategoriesExpenses.indexOf(
          categoryIdMonth!
        );
        state.monthCategoriesExpenses[categoryIndexMonth].sum =
          state.monthCategoriesExpenses[categoryIndexMonth].sum += Number(
            action.payload.value
          );
      } else {
        state.monthCategoriesExpenses = [
          ...state.monthCategoriesExpenses,
          {
            catId: action.payload.catId,
            sum: Number(action.payload.value),
            bankAccountId: action.payload.bankAccountId,
          },
        ];
      }
    },

    setPlannedExpense: (state, action) => {
      state.plannedExpenses = [
        ...state.plannedExpenses,
        {
          catId: action.payload.catId,
          name: action.payload.name,
          iconName: action.payload.iconName,
          value: 0,
        },
      ];
    },

    addPlannedExpense: (state, action) => {
      const indexOfPlannedExpense = state.plannedExpenses.findIndex(
        (item) => item.catId === action.payload.catId
      );
      state.plannedExpenses[indexOfPlannedExpense] = {
        ...state.plannedExpenses[indexOfPlannedExpense],
        value: action.payload.value,
      };
    },

    updatePlannedExpenseCategory: (state, action) => {
      if (state.plannedExpenses.length > 0) {
        const indexOfPlannedExpense = state.plannedExpenses.findIndex(
          (item) => item.catId === action.payload.catId
        );
        state.plannedExpenses[indexOfPlannedExpense] = {
          ...state.plannedExpenses[indexOfPlannedExpense],
          name: action.payload.name,
          iconName: action.payload.iconName,
        };
      } else {
        return;
      }
    },

    deleteAllExpensesFromCategory: (state, action) => {
      state.plannedExpenses = state.plannedExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.monthCategoriesExpenses = state.monthCategoriesExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.weekCategoriesExpenses = state.weekCategoriesExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.weekExpenses = state.weekExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
      state.monthExpenses = state.monthExpenses.filter(
        (item) => item.catId !== action.payload.catId
      );
    },

    setCurrentMonth: (state) => {
      //TEST
      // state.currentMonth = new Date(dateCheck).getMonth();

      state.currentMonth = new Date().getMonth();
    },

    setDateToUpdateWeek: (state) => {
      //TEST
      // const currentDay = new Date(dateCheck).getDay();
      // const daysToUpdate = 8 - currentDay;
      // const newDate = new Date(dateCheck);
      // const todayDate = new Date(dateCheck);
      // newDate.setDate(todayDate.getDate() + daysToUpdate);
      // state.dateToUpdateWeek = new Date(newDate.setHours(1, 0, 0, 1)).toJSON();

      const currentDay = new Date().getDay();
      const daysToUpdate = 8 - currentDay;
      const newDate = new Date();
      const todayDate = new Date();
      newDate.setDate(todayDate.getDate() + daysToUpdate);
      state.dateToUpdateWeek = new Date(newDate.setHours(1, 0, 0, 1)).toJSON();
    },
    updateWeekExpenses: (state) => {
      //TEST
      // const currentDay = new Date(dateCheck).getDay();
      // const daysToUpdate = 8 - currentDay;
      // const newDate = new Date(dateCheck);
      // const todayDate = new Date(dateCheck);
      // newDate.setDate(todayDate.getDate() + daysToUpdate);
      // state.dateToUpdateWeek = new Date(newDate.setHours(1, 0, 0, 1)).toJSON();
      // state.weekExpenses = [];
      // state.weekCategoriesExpenses = [];

      const currentDay = new Date().getDay();
      const daysToUpdate = 8 - currentDay;
      const newDate = new Date();
      const todayDate = new Date();
      newDate.setDate(todayDate.getDate() + daysToUpdate);
      state.dateToUpdateWeek = new Date(newDate.setHours(1, 0, 0, 1)).toJSON();
      state.weekExpenses = [];
      state.weekCategoriesExpenses = [];
    },

    updateMonth: (state) => {
      const monthToSet = new Date(state.monthExpenses[0].date).getMonth();

      const sumOfAllExpenses = state.monthCategoriesExpenses
        .map((item) => Number(item.sum))
        .reduce((partialSum, a) => partialSum + a, 0);

      //TEST
      // state.currentMonth = new Date(dateCheck).getMonth();

      state.currentMonth = new Date().getMonth();

      if (state.yearExpenses.length === 0) {
        state.yearExpenses = [
          {
            month: monthToSet,
            sumOfAllExpenses: sumOfAllExpenses,
            categoriesExpenses: state.monthCategoriesExpenses.map((item) => ({
              catId: item.catId,
              sum: item.sum,
              bankAccountId: item.bankAccountId,
              stillExsists: true,
            })),
          },
        ];
        state.monthExpenses = [];
      } else if (state.yearExpenses.length > 0) {
        state.yearExpenses = [
          ...state.yearExpenses,
          {
            month: monthToSet,
            sumOfAllExpenses: sumOfAllExpenses,
            categoriesExpenses: state.monthCategoriesExpenses.map((item) => ({
              catId: item.catId,
              sum: item.sum,
              bankAccountId: item.bankAccountId,
              stillExsists: true,
            })),
          },
        ];
        state.monthExpenses = [];
      }

      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca

      //TEST
      // if (new Date(dateCheck).getFullYear() > state.curentYear) {
      //   const yearToSet = new Date(dateCheck).getFullYear() - 1;

      if (new Date().getFullYear() > state.curentYear) {
        const yearToSet = new Date().getFullYear() - 1;

        if (state.yearExpenses.length > 0) {
          const sumOfAllExpenses = state.yearExpenses
            .map((item) => Number(item.sumOfAllExpenses))
            .reduce((partialSum, a) => partialSum + a, 0);
          if (
            state.yearsExpenses.length === 0 ||
            state.yearsExpenses === undefined
          ) {
            state.yearsExpenses = [
              {
                year: yearToSet,
                sumOfAllExpenses: sumOfAllExpenses,
                months: state.yearExpenses,
              },
            ];
          } else if (state.yearsExpenses.length > 0) {
            state.yearsExpenses = [
              ...state.yearsExpenses,
              {
                year: yearToSet,
                sumOfAllExpenses: sumOfAllExpenses,
                months: state.yearExpenses,
              },
            ];
          }

          state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
            (item) => ({
              catId: item.catId,
              bankAccountId: item.bankAccountId,
              sum: 0,
            })
          );
          state.monthExpenses = [];
          state.weekExpenses = [];
          state.weekCategoriesExpenses = [];

          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          state.yearExpenses = [];
        }

        //TEST
        // state.curentYear = new Date(dateCheck).getFullYear();

        state.curentYear = new Date().getFullYear();
      } else {
        state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
          (item) => ({
            catId: item.catId,
            bankAccountId: item.bankAccountId,
            sum: 0,
          })
        );
      }
      state.weekExpenses = [];
      state.weekCategoriesExpenses = [];
    },

    setCurrentYear: (state) => {
      //TEST
      // state.curentYear = new Date(dateCheck).getFullYear();

      state.curentYear = new Date().getFullYear();
    },

    deleteSingleExpense: (state, action) => {
      state.weekExpenses = state.weekExpenses.filter(
        (item) => item.id !== action.payload.id
      );
      state.monthExpenses = state.monthExpenses.filter(
        (item) => item.id !== action.payload.id
      );
      // Update do sum wydatków w poszczególnych kategoriach:
      // sprawdzenie czy catId dodanego wydatku istnieje?
      // znajdujemy index catId i dodajemy wartość do sumy:
      // tworzymy nowy object w array z wartoscią sum = action.payload.value
      const catIdMonthExists = state.monthCategoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);
      const catIdWeekExists = state.weekCategoriesExpenses
        .map((category) => category.catId)
        .includes(action.payload.catId);

      //tydzień
      if (catIdWeekExists) {
        const categoryIdWeek = state.weekCategoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndexWeek = state.weekCategoriesExpenses.indexOf(
          categoryIdWeek!
        );
        state.weekCategoriesExpenses[categoryIndexWeek].sum =
          state.weekCategoriesExpenses[categoryIndexWeek].sum -= Number(
            action.payload.value
          );
      }

      //miesiąc
      if (catIdMonthExists) {
        const categoryIdMonth = state.monthCategoriesExpenses.find(
          (category) => category.catId === action.payload.catId
        );
        const categoryIndexMonth = state.monthCategoriesExpenses.indexOf(
          categoryIdMonth!
        );
        state.monthCategoriesExpenses[categoryIndexMonth].sum =
          state.monthCategoriesExpenses[categoryIndexMonth].sum -= Number(
            action.payload.value
          );
      }
    },
  },
});

export const setExpense = expensesSlice.actions.setExpense;
export const addExpense = expensesSlice.actions.addExpense;
export const setPlannedExpense = expensesSlice.actions.setPlannedExpense;
export const addPlannedExpense = expensesSlice.actions.addPlannedExpense;
export const deleteAllExpensesFromCategory =
  expensesSlice.actions.deleteAllExpensesFromCategory;
export const updatePlannedExpenseCategory =
  expensesSlice.actions.updatePlannedExpenseCategory;
export const updateWeekExpenses = expensesSlice.actions.updateWeekExpenses;
export const updateMonthExpenses = expensesSlice.actions.updateMonth;
export const setCurrentYearExpenses = expensesSlice.actions.setCurrentYear;
export const setDateToUpdateWeek = expensesSlice.actions.setDateToUpdateWeek;
export const setCurrentMonthExpenses = expensesSlice.actions.setCurrentMonth;
export const deleteSingleExpense = expensesSlice.actions.deleteSingleExpense;
export default expensesSlice.reducer;
