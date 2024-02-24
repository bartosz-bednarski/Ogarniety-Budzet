import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import IncomesTabNavigator from "./incomes/IncomesTabNavigator";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import {
  setCurrentYearIncomes,
  updateMonthIncomes,
} from "../redux/incomes-slice";
import {
  updateWeekExpenses,
  updateMonthExpenses,
} from "../redux/expenses-slice";
import { updateMonthBankAccounts } from "../redux/bankAccounts-slice";
import { setCurrentYearPiggyBank } from "../redux/piggyBank-slice";

const IncomesNavigator = () => {
  //TEST
  // const dateCheck = "2025-03-15T08:06:22.626Z";
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountName
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  // const bankAccountStatus = useAppSelector(
  //   (state) => state.piggyBank.bankAccountStatus
  // );
  const Stack = createNativeStackNavigator();
  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const dispatch = useAppDispatch();
  const weekExpensesUpdated = useAppSelector(
    (state) => state.expenses.weekExpensesUpdated
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const currentYearInStore = useAppSelector(
    (state) => state.bankAccounts.accounts[0].currentYear
  );
  const dateToUpdateWeek = useAppSelector(
    (state) => state.expenses.dateToUpdateWeek
  );
  const currentMonthStore = useAppSelector(
    (state) => state.expenses.currentMonth
  );
  const expensesCurrentYearStore = useAppSelector(
    (state) => state.expenses.curentYear
  );

  // const date = new Date(dateCheck);
  // const newDate = new Date();
  // console.log("DateChecking1", newDate.setDate(date.getDate() + 30));

  // console.log("DateChecking2", newDate.toJSON());
  // console.log("checking3", dateToUpdateWeek);
  useEffect(() => {}, [weekExpensesUpdated, dispatch]);
  const dateChangeHandler = async () => {
    //TEST
    // const currentMonth = new Date(dateCheck).getMonth();
    // const currentYear = new Date(dateCheck).getFullYear();

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    console.log("categoriesIncomes", categoriesIncomes);
    //INCOMES
    if (categoriesIncomes.length > 0) {
      //if jest po to żeby kod się nie  wysypał jak nie ma zdefiniowanych żadnych wydatków
      //Tak powinno być:
      console.log("Store", currentYearInStore);
      console.log("YearExpensesStore", expensesCurrentYearStore);
      console.log("REAL", currentYear);
      console.log("REAL_MONTH", currentMonth);
      console.log("STORE_MONTH", currentMonthStore);
      if (
        currentMonth > currentMonthStore ||
        currentYear > currentYearInStore
      ) {
        const sumOfMonthIncomes = categoriesIncomes.map((item) => ({
          bankAccountId: item.bankAccountId,
          sum: item.categories
            .map((cat) => Number(cat.value))
            .reduce((partialSum, a) => partialSum + a, 0),
        }));
        // const sumOfMonthIncomes = categoriesIncomes
        //   .map((item) => Number(item.value))
        //   .reduce((partialSum, a) => partialSum + a, 0);
        const sumOfMonthExpenses =
          categoriesExpenses.length > 0
            ? categoriesExpenses.map((item) => ({
                bankAccountId: item.bankAccountId,
                sum: item.categories
                  .map((cat) => Number(cat.sum))
                  .reduce((partialSum, a) => partialSum + a, 0),
              }))
            : 0;

        // const sumOfMonthExpenses = categoriesExpenses
        //   .map((item) => Number(item.value))
        //   .reduce((partialSum, a) => partialSum + a, 0);
        console.log("CKEKINGfasf", sumOfMonthIncomes);
        const savings = sumOfMonthIncomes.map((item) => {
          const index =
            sumOfMonthExpenses !== 0
              ? sumOfMonthExpenses.findIndex(
                  (expense) => expense.bankAccountId === item.bankAccountId
                )
              : -1;
          let sumOfExpenses = 0;
          if (sumOfMonthExpenses !== 0) {
            sumOfExpenses = index !== -1 ? sumOfMonthExpenses[index].sum : 0;
          }

          // const sumOfExpenses =
          //   sumOfMonthExpenses !== 0
          //     ? sumOfMonthExpenses[

          //       ].sum
          //     : 0;

          return {
            bankAccountId: item.bankAccountId,
            savings: item.sum - sumOfExpenses,
          };
        });

        // const savings = Number(sumOfMonthIncomes) - Number(sumOfMonthExpenses);

        dispatch(
          updateMonthBankAccounts({
            month: currentMonthStore,
            savings: savings,
          })
        );

        dispatch(updateMonthIncomes());
        //EXPENSES
        dispatch(updateWeekExpenses());
        dispatch(updateMonthExpenses());
        dispatch(setCurrentYearPiggyBank());
      }
    }

    //TEST
    // if (new Date(dateCheck) > new Date(dateToUpdateWeek)) {
    //   dispatch(updateWeekExpenses());
    // }

    if (new Date() > new Date(dateToUpdateWeek)) {
      dispatch(updateWeekExpenses());
      dispatch(setCurrentYearPiggyBank());
    }
    dispatch(setCurrentYearPiggyBank());
  };

  //useEffect do sprawdzania czy miesiąc uległ zmianie, jeżeli tak to wprowadzenie zmian w reduxie w danych
  useEffect(() => {
    dateChangeHandler();
  }, [currentYearInStore]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
      }}
    >
      <Stack.Screen
        component={IncomesTabNavigator}
        name="incomes"
        options={({ route, navigation }) => ({
          headerTintColor: COLORS_STYLE.basicGold,
          headerPressColor: COLORS_STYLE.basicGold,
          headerPressOpacity: 1,
          headerTitle: activeBankAccount,
          headerTitleAlign: "center",
          headerRight: () => {
            if (bankAccounts.findIndex((i) => i.accountId === "0") === -1) {
              return (
                <Pressable
                  onPress={() => navigation.navigate("settingsNavigator")}
                >
                  <Ionicons
                    name="cog"
                    size={30}
                    color={COLORS_STYLE.basicGold}
                    style={{ marginRight: 10 }}
                  />
                </Pressable>
              );
            }
          },
        })}
      />
      <Stack.Screen
        component={SettingsNavigator}
        name="settingsNavigator"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default IncomesNavigator;
