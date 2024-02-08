import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import IncomesTabNavigator from "./incomes/IncomesTabNavigator";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { updateMonthIncomes } from "../redux/incomes-slice";
import { updateMonthPiggyBank } from "../redux/piggyBank-slice";
import {
  updateWeekExpenses,
  updateMonthExpenses,
} from "../redux/expenses-slice";
const IncomesNavigator = () => {
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  const Stack = createNativeStackNavigator();
  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const dispatch = useAppDispatch();
  const weekExpenses = useAppSelector((state) => state.expenses.weekExpenses);
  const weekExpensesUpdated = useAppSelector(
    (state) => state.expenses.weekExpensesUpdated
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthExpenses
  );
  const currentYearInStore = useAppSelector(
    (state) => state.piggyBank.curentYear
  );
  const dateToUpdateWeek = useAppSelector(
    (state) => state.expenses.dateToUpdateWeek
  );
  const currentMonthStore = useAppSelector(
    (state) => state.expenses.currentMonth
  );
  const dateCheck = "2025-03-15T08:06:22.626Z";
  const date = new Date(dateCheck);
  const newDate = new Date();
  console.log("DateChecking1", newDate.setDate(date.getDate() + 30));

  console.log("DateChecking2", newDate.toJSON());
  console.log("checking3", dateToUpdateWeek);
  useEffect(() => {}, [weekExpensesUpdated, dispatch]);
  console.log(currentMonthStore);
  const dateChangeHandler = async () => {
    //Test
    let currentDay = 2;
    let currentMonth = new Date(dateCheck).getMonth();
    let currentYear = 2025;
    //INCOMES
    if (categoriesIncomes.length > 0) {
      //if jest po to żeby kod się nie  wysypał jak nie ma zdefiniowanych żadnych wydatków
      //Tak powinno być:
      // const currentMonth = new Date().getMonth();
      const monthOfLatestIncome = new Date(
        categoriesIncomes[0].date
      ).getMonth();
      if (
        currentMonth > currentMonthStore ||
        currentYear > currentYearInStore
      ) {
        const sumOfMonthIncomes = categoriesIncomes
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0);
        const sumOfMonthExpenses = categoriesExpenses
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0);
        const savings = Number(sumOfMonthIncomes) - Number(sumOfMonthExpenses);
        dispatch(
          updateMonthPiggyBank({
            month: currentMonthStore,
            savings: savings,
          })
        );
        dispatch(updateMonthIncomes());
      }
    }

    //EXPENSES
    console.log("DATETOUPDATE", dateToUpdateWeek);
    console.log("DATECHECK", dateCheck);
    console.log("daysToUpdate", new Date(dateCheck).getDay());
    if (currentMonth > currentMonthStore || currentYear > currentYearInStore) {
      dispatch(updateWeekExpenses());
      dispatch(updateMonthExpenses());
    }
    if (new Date(dateCheck) > new Date(dateToUpdateWeek)) {
      console.log("ok");
      dispatch(updateWeekExpenses());
      //   if (currentDay !== 1 && weekExpensesUpdated) {
      //     console.log("update to false");
      //     dispatch(updateWeekExpenses(false));
      //   }
      //   if (currentDay === 1 && !weekExpensesUpdated) {
      //     console.log("update to true 1", weekExpensesUpdated);
      //     dispatch(updateWeekExpenses(true));
      //     console.log("update to true 2", weekExpensesUpdated);
      //   }
      // }
      // if (categoriesExpenses.length > 0) {
      //   const monthOfLatestIncome = new Date(
      //     categoriesExpenses[0].date
      //   ).getMonth();
    }
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
          headerTitle: "Przychody",
          headerTitleAlign: "center",
          headerRight: () => {
            if (bankAccountStatus !== 0) {
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
