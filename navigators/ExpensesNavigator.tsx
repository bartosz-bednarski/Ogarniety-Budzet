import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import ExpensesScreen from "../screens/expenses/WeekExpensesScreen";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExpensesTabNavigator from "./expenses/ExpensesTabNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import AddExpenseScreen from "../screens/expenses/AddExpenseScreen";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  updateMonthExpenses,
  updateWeekExpenses,
} from "../redux/expenses-slice";
const ExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();
  const weekExpenses = useAppSelector((state) => state.expenses.weekExpenses);
  const weekExpensesUpdated = useAppSelector(
    (state) => state.expenses.weekExpensesUpdated
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthExpenses
  );
  const yearsExpenses = useAppSelector((state) => state.expenses.yearsExpenses);
  // console.log("YEARS_EXPENSES", yearsExpenses);
  useEffect(() => {
    //Test
    // console.log(categoriesIncomes);
    let currentDay = 10;
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", categoriesExpenses);
    if (weekExpenses.length > 0) {
      // console.log("update?", weekExpensesUpdated);
      if (currentDay === 1 && !weekExpensesUpdated) {
        dispatch(updateWeekExpenses(true));
      }
      if (currentDay !== 1 && weekExpensesUpdated) {
        dispatch(updateWeekExpenses(false));
      }
    }

    if (categoriesExpenses.length > 0) {
      let currentMonth = 1;
      const monthOfLatestIncome = new Date(
        categoriesExpenses[0].date
      ).getMonth();
      if (
        currentMonth > monthOfLatestIncome ||
        (currentMonth === 0 && monthOfLatestIncome === 11)
      ) {
        // console.log("mothofLatestIncome", monthOfLatestIncome);
        dispatch(updateMonthExpenses());
        dispatch(updateWeekExpenses("monthChange"));
        // console.log("zmiana miesiąca");
      } else {
        console.log("miesiąc zostaje");
      }
    }
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
      }}
    >
      <Stack.Screen
        component={ExpensesTabNavigator}
        name="expenses"
        options={({ route, navigation }) => ({
          headerTintColor: COLORS_STYLE.basicGold,
          headerPressColor: COLORS_STYLE.basicGold,
          headerPressOpacity: 1,
          headerTitle: "Wydatki",
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
        component={AddExpenseScreen}
        name="addExpense"
        options={({ route, navigation }) => ({
          headerTintColor: COLORS_STYLE.basicGold,
          headerPressColor: COLORS_STYLE.basicGold,
          headerPressOpacity: 1,
          headerTitle: "Dodaj wydatek",
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
export default ExpensesNavigator;
