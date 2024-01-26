import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import IncomesScreen from "../screens/incomes/MonthIncomesScreen";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import IncomesTabNavigator from "./incomes/IncomesTabNavigator";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { updateMonth } from "../redux/incomes-slice";
import { updateMonthPiggyBank } from "../redux/piggyBank-slice";
import {
  updateWeekExpenses,
  updateMonthExpenses,
} from "../redux/expenses-slice";
const IncomesNavigator = () => {
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
  // const yearSavings = useAppSelector((state) => state.piggyBank.yearsSavings);
  // console.log(yearSavings);

  const dateChangeHandler = async () => {
    //Test
    let currentDay = 27;
    let currentMonth = 4;
    let currentYear = 2027;
    console.log(currentYearInStore);
    //INCOMES
    if (categoriesIncomes.length > 0) {
      //if jest po to żeby kod się nie  wysypał jak nie ma zdefiniowanych żadnych wydatków
      //Tak powinno być:
      // const currentMonth = new Date().getMonth();
      const monthOfLatestIncome = new Date(
        categoriesIncomes[0].date
      ).getMonth();
      // console.log("1234567897454", monthOfLatestIncome);
      if (
        currentMonth > monthOfLatestIncome ||
        currentYear > currentYearInStore
      ) {
        console.log(currentMonth, monthOfLatestIncome);
        const sumOfMonthIncomes = categoriesIncomes
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0);
        const sumOfMonthExpenses = categoriesExpenses
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0);
        const savings = Number(sumOfMonthIncomes) - Number(sumOfMonthExpenses);
        console.log("SAVINGS", savings);
        dispatch(
          updateMonthPiggyBank({
            month: monthOfLatestIncome,
            savings: savings,
          })
        );
        dispatch(updateMonth());
      }
    }

    //EXPENSES
    if (weekExpenses.length > 0) {
      if (currentDay === 1 && !weekExpensesUpdated) {
        dispatch(updateWeekExpenses(true));
      }
      if (currentDay !== 1 && weekExpensesUpdated) {
        dispatch(updateWeekExpenses(false));
      }
    }
    if (categoriesExpenses.length > 0) {
      const monthOfLatestIncome = new Date(
        categoriesExpenses[0].date
      ).getMonth();
      if (
        currentMonth > monthOfLatestIncome ||
        currentYear > currentYearInStore
      ) {
        dispatch(updateMonthExpenses());
        dispatch(updateWeekExpenses("monthChange"));
      }
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
