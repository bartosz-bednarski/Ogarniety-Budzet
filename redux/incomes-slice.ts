import { createSlice } from "@reduxjs/toolkit";
import { IncomesInitialState } from "../types/incomes";

//TEST
// const dateCheck = "2025-03-15T08:06:22.626Z";
//TEST
// const incomesInitialState: IncomesInitialState = {
//   categoriesIncomes: [],
//   yearIncomes: [],
//   yearsIncomes: [],
//   curentYear: new Date(dateCheck).getFullYear(),
// };
const incomesInitialState: IncomesInitialState = {
  categoriesIncomes: [],
  yearIncomes: [],
  yearsIncomes: [],
  curentYear: new Date().getFullYear(),
};

const incomesSlice = createSlice({
  name: "incomes",
  initialState: incomesInitialState,
  reducers: {
    setIncome: (state, action) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      if (state.categoriesIncomes.length === 0) {
        state.categoriesIncomes = [
          //TEST
          // {
          //   catId: action.payload.catId,
          //   date: dateCheck,
          //   dateString: fullDate,
          //   value: 0,
          // },
          {
            bankAccountId: action.payload.bankAccountId,
            categories: [
              {
                catId: action.payload.catId,
                date: new Date().toJSON(),
                dateString: fullDate,
                value: 0,
              },
            ],
          },
        ];
      } else if (state.categoriesIncomes.length > 0) {
        state.categoriesIncomes = [
          ...state.categoriesIncomes.map((item) => ({
            bankAccountId: item.bankAccountId,
            categories: [
              ...item.categories,
              {
                catId: action.payload.catId,
                date: new Date().toJSON(),
                dateString: fullDate,
                value: 0,
              },
            ],
          })),
          {
            bankAccountId: action.payload.bankAccountId,
            categories: [
              ...state.categoriesIncomes[0].categories.map((item) => ({
                catId: item.catId,
                date: new Date().toJSON(),
                dateString: fullDate,
                value: 0,
              })),
              {
                catId: action.payload.catId,
                date: new Date().toJSON(),
                dateString: fullDate,
                value: 0,
              },
            ],
          },
        ];
      }
    },
    updateIncome: (state, action) => {
      if (state.categoriesIncomes.length > 0) {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const fullDate = `${day}.${month}.${year}`;
        const indexOfBankAccout = state.categoriesIncomes.findIndex(
          (item) => item.bankAccountId === action.payload.bankAccountId
        );
        const indexOfIncome = state.categoriesIncomes[
          indexOfBankAccout
        ].categories.findIndex((item) => item.catId === action.payload.catId);
        //TEST
        // state.categoriesIncomes[indexOfIncome] = {
        //   ...state.categoriesIncomes[indexOfIncome],
        //   date: dateCheck,
        //   dateString: fullDate,
        //   value: action.payload.value,
        // };
        state.categoriesIncomes[indexOfBankAccout].categories[indexOfIncome] = {
          catId:
            state.categoriesIncomes[indexOfBankAccout].categories[indexOfIncome]
              .catId,
          date: new Date().toJSON(),
          dateString: fullDate,
          value: action.payload.value,
        };
      } else {
        return;
      }
    },
    deleteIncome: (state, action) => {
      state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
        bankAccountId: item.bankAccountId,
        categories: item.categories.filter(
          (cat) => cat.catId !== action.payload.catId
        ),
      }));

      state.yearIncomes = state.yearIncomes.map((item) => ({
        bankAccountId: item.bankAccountId,
        months: item.months.map((month) => ({
          month: month.month,
          sumOfAllIncomes: month.sumOfAllIncomes,
          categoriesIncomes: month.categoriesIncomes.map((catIncome) => ({
            catId: catIncome.catId,
            value: catIncome.value,
            bankAccountId: catIncome.bankAccountId,
            stillExsists:
              catIncome.catId === action.payload.catId ? false : true,
          })),
        })),
      }));
    },
    updateMonth: (state) => {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      const monthToSet = new Date(
        state.categoriesIncomes[0].categories[0].date
      ).getMonth();

      //dodaj nowy miesiac z danymi z miesiaca do tablicy
      //jezeli tablica z msc jest pusta dodajemy nowy miesiac, jezeli nie to robimy spread pozostalych i dodajemy nowy
      if (state.yearIncomes.length === 0) {
        state.yearIncomes = state.categoriesIncomes.map((item) => ({
          bankAccountId: item.bankAccountId,
          months: [
            {
              month: monthToSet,
              sumOfAllIncomes: item.categories
                .map((income) => Number(income.value))
                .reduce((partialSum, a) => partialSum + a, 0),
              categoriesIncomes: item.categories.map((catIncome) => ({
                catId: catIncome.catId,
                value: catIncome.value,
                stillExsists: true,
                bankAccountId: item.bankAccountId,
              })),
            },
          ],
        }));
      } else if (state.yearIncomes.length > 0) {
        let bankAccountIndexToAddYearIncomes: number | null = null;
        for (let i = 0; i < state.categoriesIncomes.length; i++) {
          const yearIncomesIndex = state.yearIncomes.findIndex(
            (item) =>
              item.bankAccountId === state.categoriesIncomes[i].bankAccountId
          );
          if (yearIncomesIndex === -1) {
            bankAccountIndexToAddYearIncomes = i;
          }
        }

        if (bankAccountIndexToAddYearIncomes === null) {
          state.yearIncomes = state.yearIncomes.map((item) => {
            const bankAccountIndex = state.categoriesIncomes.findIndex(
              (i) => i.bankAccountId === item.bankAccountId
            );
            return {
              bankAccountId: item.bankAccountId,
              months: [
                ...item.months,
                {
                  month: monthToSet,
                  sumOfAllIncomes: state.categoriesIncomes[
                    bankAccountIndex
                  ].categories
                    .map((income) => Number(income.value))
                    .reduce((partialSum, a) => partialSum + a, 0),
                  categoriesIncomes: state.categoriesIncomes[
                    bankAccountIndex
                  ].categories.map((catIncome) => ({
                    catId: catIncome.catId,
                    value: catIncome.value,
                    stillExsists: true,
                    bankAccountId: item.bankAccountId,
                  })),
                },
              ],
            };
          });
        } else if (bankAccountIndexToAddYearIncomes !== null) {
          state.yearIncomes = [
            ...state.yearIncomes.map((item) => {
              const bankAccountIndex = state.categoriesIncomes.findIndex(
                (i) => i.bankAccountId === item.bankAccountId
              );
              return {
                bankAccountId: item.bankAccountId,
                months: [
                  ...item.months,
                  {
                    month: monthToSet,
                    sumOfAllIncomes: state.categoriesIncomes[
                      bankAccountIndex
                    ].categories
                      .map((income) => Number(income.value))
                      .reduce((partialSum, a) => partialSum + a, 0),
                    categoriesIncomes: state.categoriesIncomes[
                      bankAccountIndex
                    ].categories.map((catIncome) => ({
                      catId: catIncome.catId,
                      value: catIncome.value,
                      stillExsists: true,
                      bankAccountId: item.bankAccountId,
                    })),
                  },
                ],
              };
            }),
            {
              bankAccountId:
                state.categoriesIncomes[bankAccountIndexToAddYearIncomes]
                  .bankAccountId,
              months: [
                {
                  month: monthToSet,
                  sumOfAllIncomes: state.categoriesIncomes[
                    bankAccountIndexToAddYearIncomes
                  ].categories
                    .map((income) => Number(income.value))
                    .reduce((partialSum, a) => partialSum + a, 0),
                  categoriesIncomes: state.categoriesIncomes[
                    bankAccountIndexToAddYearIncomes
                  ].categories.map((catIncome) => ({
                    catId: catIncome.catId,
                    value: catIncome.value,
                    stillExsists: true,
                    bankAccountId:
                      state.categoriesIncomes[bankAccountIndexToAddYearIncomes!]
                        .bankAccountId,
                  })),
                },
              ],
            },
          ];
        }
      }
      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca

      //TEST
      // if (new Date(dateCheck).getFullYear() > state.curentYear) {
      //   const yearToSet = new Date(dateCheck).getFullYear() - 1;
      if (new Date().getFullYear() > state.curentYear) {
        const yearToSet = new Date().getFullYear() - 1;
        if (state.yearIncomes.length > 0) {
          if (
            state.yearsIncomes.length === 0 ||
            state.yearsIncomes === undefined
          ) {
            state.yearsIncomes = state.yearIncomes.map((item) => ({
              bankAccountId: item.bankAccountId,
              years: [
                {
                  year: yearToSet,
                  sumOfAllIncomes: item.months
                    .map((month) => Number(month.sumOfAllIncomes))
                    .reduce((partialSum, a) => partialSum + a, 0),
                  months: item.months,
                },
              ],
            }));
          } else if (state.yearsIncomes.length > 0) {
            //bankAccountIndexToAddYearsIncomes => Sprawdzenie czy w zestawieniu wieloletnim są wszystkie waluty, które były w ostatnich miesiącach.
            //Przykład: W ciągu roku tworzymy dwa rachunki w walutach PLN i EUR. Po roku dostajemy podsumowanie wieleletnie (yearsIncomes), następnie dodajemy nowy rachunek w walucie GBP.
            //Przy końcu roku sprawdzamy czy GBP jest w yearsIncomes, jeżeli nie to dodajemy.
            //bankAccountIndexToAddYearsIncomes === null => waluty się zgadzają
            //bankAccountIndexToAddYearsIncomes !== null => waluty się nie zgadzają, trzeba zrobić update yearsIncomes
            let bankAccountIndexToAddYearsIncomes: number | null = null;
            for (let i = 0; i < state.yearIncomes.length; i++) {
              const yearsIncomesIndex = state.yearsIncomes.findIndex(
                (item) =>
                  item.bankAccountId === state.yearIncomes[i].bankAccountId
              );
              if (yearsIncomesIndex === -1) {
                bankAccountIndexToAddYearsIncomes = i;
              }
            }

            if (bankAccountIndexToAddYearsIncomes === null) {
              state.yearsIncomes = state.yearsIncomes.map((item) => {
                const bankAccountIndex = state.yearIncomes.findIndex(
                  (i) => i.bankAccountId === item.bankAccountId
                );
                return {
                  bankAccountId: item.bankAccountId,
                  years: [
                    ...item.years,
                    {
                      year: yearToSet,
                      sumOfAllIncomes: state.yearIncomes[
                        bankAccountIndex
                      ].months
                        .map((month) => Number(month.sumOfAllIncomes))
                        .reduce((partialSum, a) => partialSum + a, 0),
                      months: state.yearIncomes[bankAccountIndex].months,
                    },
                  ],
                };
              });
            } else if (bankAccountIndexToAddYearsIncomes !== null) {
              state.yearsIncomes = [
                ...state.yearsIncomes.map((item) => {
                  const bankAccountIndex = state.yearIncomes.findIndex(
                    (i) => i.bankAccountId === item.bankAccountId
                  );
                  return {
                    bankAccountId: item.bankAccountId,
                    years: [
                      ...item.years,
                      {
                        year: yearToSet,
                        sumOfAllIncomes: state.yearIncomes[
                          bankAccountIndex
                        ].months
                          .map((month) => Number(month.sumOfAllIncomes))
                          .reduce((partialSum, a) => partialSum + a, 0),
                        months: state.yearIncomes[bankAccountIndex].months,
                      },
                    ],
                  };
                }),
                {
                  bankAccountId:
                    state.yearIncomes[bankAccountIndexToAddYearsIncomes]
                      .bankAccountId,
                  years: [
                    {
                      year: yearToSet,
                      sumOfAllIncomes: state.yearIncomes[
                        bankAccountIndexToAddYearsIncomes
                      ].months
                        .map((month) => Number(month.sumOfAllIncomes))
                        .reduce((partialSum, a) => partialSum + a, 0),
                      months:
                        state.yearIncomes[bankAccountIndexToAddYearsIncomes]
                          .months,
                    },
                  ],
                },
              ];
            }
          }
          //TEST
          // state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
          //   catId: item.catId,
          //   date: dateCheck,
          //   dateString: fullDate,
          //   value: 0,
          // }));
          state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
            bankAccountId: item.bankAccountId,
            categories: item.categories.map((category) => ({
              catId: category.catId,
              date: new Date().toJSON(),
              dateString: fullDate,
              value: 0,
            })),
          }));

          //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
          state.yearIncomes = state.yearIncomes.map((item) => ({
            bankAccountId: item.bankAccountId,
            months: [],
          }));
        }
        //TEST
        // state.curentYear = new Date(dateCheck).getFullYear();
        state.curentYear = new Date().getFullYear();
      } else {
        //TEST
        // state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
        //   catId: item.catId,
        //   date: dateCheck,
        //   dateString: fullDate,
        //   value: 0,
        // }))
        state.categoriesIncomes = state.categoriesIncomes.map((item) => ({
          bankAccountId: item.bankAccountId,
          categories: item.categories.map((category) => ({
            catId: category.catId,
            date: new Date().toJSON(),
            dateString: fullDate,
            value: 0,
          })),
        }));
      }
    },
    setCurrentYear: (state) => {
      //TEST
      // state.curentYear = new Date(dateCheck).getFullYear();
      state.curentYear = new Date().getFullYear();
    },
  },
});

export const setIncome = incomesSlice.actions.setIncome;
export const updateIncome = incomesSlice.actions.updateIncome;
export const deleteIncome = incomesSlice.actions.deleteIncome;
export const updateMonthIncomes = incomesSlice.actions.updateMonth;
export const setCurrentYearIncomes = incomesSlice.actions.setCurrentYear;
export default incomesSlice.reducer;
