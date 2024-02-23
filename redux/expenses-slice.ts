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
        {
          bankAccountId: action.payload.bankAccountId,
          categories: [
            {
              catId: action.payload.catId,
              sum: 0,
            },
          ],
        },
      ];

      state.weekCategoriesExpenses = [
        ...state.weekCategoriesExpenses,
        {
          bankAccountId: action.payload.bankAccountId,
          categories: [
            {
              catId: action.payload.catId,
              sum: 0,
            },
          ],
        },
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
          bankAccountId: action.payload.bankAccountId,
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
          bankAccountId: action.payload.bankAccountId,
        },
      ];
    },
    createNewBankAccountExpensesInitialSetup: (state, action) => {
      state.monthCategoriesExpenses = [
        ...state.monthCategoriesExpenses,
        {
          bankAccountId: action.payload.bankAccountId,
          categories: state.monthCategoriesExpenses[0].categories.map(
            (item) => ({
              catId: item.catId,
              sum: 0,
            })
          ),
        },
      ];

      state.weekCategoriesExpenses = [
        ...state.weekCategoriesExpenses,
        {
          bankAccountId: action.payload.bankAccountId,
          categories: state.weekCategoriesExpenses[0].categories.map(
            (item) => ({
              catId: item.catId,
              sum: 0,
            })
          ),
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

      let day: number | string = new Date().getDate();
      if (String(day).length === 1) {
        day = `0${day}`;
      }
      let month: string | number = new Date().getMonth() + 1;
      if (String(month).length === 1) {
        month = `0${month}`;
      }
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
      const bankItemIndexMonth = state.monthCategoriesExpenses.findIndex(
        (item) => item.bankAccountId === action.payload.bankAccountId
      );
      const bankItemIndexWeek = state.weekCategoriesExpenses.findIndex(
        (item) => item.bankAccountId === action.payload.bankAccountId
      );
      const catIdMonthExists = state.monthCategoriesExpenses[
        bankItemIndexMonth
      ].categories.find((i) => i.catId === action.payload.catId);

      const catIdWeekExists = state.weekCategoriesExpenses[
        bankItemIndexWeek
      ].categories.find((i) => i.catId === action.payload.catId);
      // console.log(
      //   "XXXXXXXX",
      //   state.weekCategoriesExpenses[bankItemIndex].categories.find(
      //     (i) => i.catId === action.payload.catId
      //   )
      // );
      //tydzień
      if (catIdWeekExists !== undefined) {
        const categoryToUpdateIndex = state.weekCategoriesExpenses[
          bankItemIndexWeek
        ].categories.findIndex((i) => i.catId === action.payload.catId);
        // const categoryIdWeek = state.weekCategoriesExpenses
        //   .filter((item) => item.bankAccountId === action.payload.bankAccountId)
        //   .map((i) => i.categories)
        //   .find((category) => category.catId === action.payload.catId);
        // const categoryIndexWeek = state.weekCategoriesExpenses.indexOf(
        //   categoryIdWeek!
        // );
        state.weekCategoriesExpenses[bankItemIndexWeek].categories[
          categoryToUpdateIndex
        ].sum = state.weekCategoriesExpenses[bankItemIndexWeek].categories[
          categoryToUpdateIndex
        ].sum += Number(action.payload.value);
      } else {
        state.weekCategoriesExpenses = [
          ...state.weekCategoriesExpenses.filter(
            (item) => item.bankAccountId !== action.payload.bankAccountId
          ),
          {
            bankAccountId: action.payload.bankAccountId,
            categories: [
              ...state.weekCategoriesExpenses[bankItemIndexWeek].categories,
              {
                catId: action.payload.catId,
                sum: Number(action.payload.value),
              },
            ],
          },
        ];
      }

      //miesiąc
      if (catIdMonthExists !== undefined) {
        const categoryToUpdateIndex = state.monthCategoriesExpenses[
          bankItemIndexMonth
        ].categories.findIndex((i) => i.catId === action.payload.catId);
        state.monthCategoriesExpenses[bankItemIndexMonth].categories[
          categoryToUpdateIndex
        ].sum = state.monthCategoriesExpenses[bankItemIndexMonth].categories[
          categoryToUpdateIndex
        ].sum += Number(action.payload.value);
      } else {
        state.monthCategoriesExpenses = [
          ...state.monthCategoriesExpenses.filter(
            (item) => item.bankAccountId !== action.payload.bankAccountId
          ),
          {
            bankAccountId: action.payload.bankAccountId,
            categories: [
              ...state.monthCategoriesExpenses[bankItemIndexMonth].categories,
              {
                catId: action.payload.catId,
                sum: Number(action.payload.value),
              },
            ],
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
      state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
        (item) => ({
          bankAccountId: item.bankAccountId,
          categories: item.categories.filter(
            (cat) => cat.catId !== action.payload.catId
          ),
        })
      );
      state.weekCategoriesExpenses = state.weekCategoriesExpenses.map(
        (item) => ({
          bankAccountId: item.bankAccountId,
          categories: item.categories.filter(
            (cat) => cat.catId !== action.payload.catId
          ),
        })
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
      state.weekCategoriesExpenses = state.weekCategoriesExpenses.map(
        (item) => ({ bankAccountId: item.bankAccountId, categories: [] })
      );
    },

    updateMonth: (state) => {
      const monthToSet = new Date(state.monthExpenses[0].date).getMonth();

      //TEST
      // state.currentMonth = new Date(dateCheck).getMonth();

      state.currentMonth = new Date().getMonth();

      if (state.yearExpenses.length === 0) {
        state.yearExpenses = state.monthCategoriesExpenses.map((item) => ({
          bankAccountId: item.bankAccountId,
          months: [
            {
              month: monthToSet,
              sumOfAllExpenses: item.categories
                .map((i) => Number(i.sum))
                .reduce((partialSum, a) => partialSum + a, 0),
              categoriesExpenses: item.categories.map((cat) => ({
                catId: cat.catId,
                sum: cat.sum,
                stillExsists: true,
                bankAccountId: item.bankAccountId,
              })),
            },
          ],
        }));

        // state.yearExpenses = [
        //   {
        //     month: monthToSet,
        //     sumOfAllExpenses: sumOfAllExpenses,
        //     categoriesExpenses: state.monthCategoriesExpenses.map((item) => ({
        //       catId: item.catId,
        //       sum: item.sum,
        //       bankAccountId: item.bankAccountId,
        //       stillExsists: true,
        //     })),
        //   },
        // ];
        state.monthExpenses = [];
      } else if (state.yearExpenses.length > 0) {
        state.yearExpenses = state.yearExpenses.map((item) => {
          const monthExpensesId = state.monthCategoriesExpenses.findIndex(
            (i) => i.bankAccountId === item.bankAccountId
          );
          return {
            bankAccountId: item.bankAccountId,
            months: [
              ...item.months,
              {
                month: monthToSet,
                sumOfAllExpenses: state.monthCategoriesExpenses[
                  monthExpensesId
                ].categories
                  .map((i) => Number(i.sum))
                  .reduce((partialSum, a) => partialSum + a, 0),
                categoriesExpenses: state.monthCategoriesExpenses[
                  monthExpensesId
                ].categories.map((cat) => ({
                  catId: cat.catId,
                  sum: cat.sum,
                  stillExsists: true,
                  bankAccountId: item.bankAccountId,
                })),
              },
            ],
          };
        });

        // state.yearExpenses = [
        //   ...state.yearExpenses,
        //   {
        //     month: monthToSet,
        //     sumOfAllExpenses: sumOfAllExpenses,
        //     categoriesExpenses: state.monthCategoriesExpenses.map((item) => ({
        //       catId: item.catId,
        //       sum: item.sum,
        //       bankAccountId: item.bankAccountId,
        //       stillExsists: true,
        //     })),
        //   },
        // ];
        state.monthExpenses = [];
      }

      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca

      //TEST
      // if (new Date(dateCheck).getFullYear() > state.curentYear) {
      //   const yearToSet = new Date(dateCheck).getFullYear() - 1;

      if (new Date().getFullYear() > state.curentYear) {
        const yearToSet = new Date().getFullYear() - 1;

        if (state.yearExpenses.length > 0) {
          if (
            state.yearsExpenses.length === 0 ||
            state.yearsExpenses === undefined
          ) {
            state.yearsExpenses = state.yearExpenses.map((item) => ({
              bankAccountId: item.bankAccountId,
              years: [
                {
                  year: yearToSet,
                  sumOfAllExpenses: item.months
                    .map((month) => month.sumOfAllExpenses)
                    .reduce((partialSum, a) => partialSum + a, 0),
                  months: item.months,
                },
              ],
            }));
            // state.yearsExpenses = [

            //   {
            //     year: yearToSet,
            //     sumOfAllExpenses: sumOfAllExpenses,
            //     months: state.yearExpenses,
            //   },
            // ];
          } else if (state.yearsExpenses.length > 0) {
            state.yearsExpenses = state.yearsExpenses.map((item) => {
              const yearExpenseId = state.yearExpenses.findIndex(
                (i) => i.bankAccountId === item.bankAccountId
              );
              return {
                bankAccountId: item.bankAccountId,
                years: [
                  ...item.years,
                  {
                    year: yearToSet,
                    sumOfAllExpenses: state.yearExpenses[yearExpenseId].months
                      .map((month) => month.sumOfAllExpenses)
                      .reduce((partialSum, a) => partialSum + a, 0),
                    months: state.yearExpenses[yearExpenseId].months,
                  },
                ],
              };
            });
            // state.yearsExpenses = [
            //   ...state.yearsExpenses,
            //   {
            //     year: yearToSet,
            //     sumOfAllExpenses: sumOfAllExpenses,
            //     months: state.yearExpenses,
            //   },
            // ];
          }
        }
        state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
          (item) => ({
            bankAccountId: item.bankAccountId,
            categories: item.categories.map((cat) => ({
              catId: cat.catId,
              sum: 0,
            })),
          })
        );
        state.monthExpenses = [];
        state.weekExpenses = [];
        state.weekCategoriesExpenses = state.weekCategoriesExpenses.map(
          (item) => ({ bankAccountId: item.bankAccountId, categories: [] })
        );

        //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
        state.yearExpenses = [];
        //TEST
        // state.curentYear = new Date(dateCheck).getFullYear();

        state.curentYear = new Date().getFullYear();
      } else {
        state.monthCategoriesExpenses = state.monthCategoriesExpenses.map(
          (item) => ({
            bankAccountId: item.bankAccountId,
            categories: item.categories.map((cat) => ({
              catId: cat.catId,
              sum: 0,
            })),
          })
        );
      }
      state.weekExpenses = [];
      state.weekCategoriesExpenses = state.weekCategoriesExpenses.map(
        (item) => ({ bankAccountId: item.bankAccountId, categories: [] })
      );
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
      const bankItemIndexMonth = state.monthCategoriesExpenses.findIndex(
        (item) => item.bankAccountId === action.payload.bankAccountId
      );
      const catIdMonthExists = state.monthCategoriesExpenses[
        bankItemIndexMonth
      ].categories.find((i) => i.catId === action.payload.catId);
      const bankItemIndexWeek = state.weekCategoriesExpenses.findIndex(
        (item) => item.bankAccountId === action.payload.bankAccountId
      );
      const catIdWeekExists = state.weekCategoriesExpenses[
        bankItemIndexWeek
      ].categories.find((i) => i.catId === action.payload.catId);
      //tydzień
      if (catIdWeekExists !== undefined) {
        const categoryToUpdateIndex = state.weekCategoriesExpenses[
          bankItemIndexWeek
        ].categories.findIndex((i) => i.catId === action.payload.catId);
        // const categoryIdWeek = state.weekCategoriesExpenses.find(
        //   (category) => category.catId === action.payload.catId
        // );
        // const categoryIndexWeek = state.weekCategoriesExpenses.indexOf(
        //   categoryIdWeek!
        // );
        // state.weekCategoriesExpenses[categoryIndexWeek].sum =
        //   state.weekCategoriesExpenses[categoryIndexWeek].sum -= Number(
        //     action.payload.value
        //   );
        state.weekCategoriesExpenses[bankItemIndexWeek].categories[
          categoryToUpdateIndex
        ].sum = state.weekCategoriesExpenses[bankItemIndexWeek].categories[
          categoryToUpdateIndex
        ].sum -= Number(action.payload.value);
      }

      //miesiąc
      if (catIdMonthExists !== undefined) {
        const bankItemIndexMonth = state.monthCategoriesExpenses.findIndex(
          (item) => item.bankAccountId === action.payload.bankAccountId
        );
        const categoryToUpdateIndex = state.monthCategoriesExpenses[
          bankItemIndexMonth
        ].categories.findIndex((i) => i.catId === action.payload.catId);

        state.monthCategoriesExpenses[bankItemIndexMonth].categories[
          categoryToUpdateIndex
        ].sum = state.monthCategoriesExpenses[bankItemIndexMonth].categories[
          categoryToUpdateIndex
        ].sum -= Number(action.payload.value);
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
export const createNewBankAccountInitialExpensesSetup =
  expensesSlice.actions.createNewBankAccountExpensesInitialSetup;
export default expensesSlice.reducer;
