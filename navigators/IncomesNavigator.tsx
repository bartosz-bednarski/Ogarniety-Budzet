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
  //TEST
  // const dateCheck = "2025-03-15T08:06:22.626Z";

  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  const Stack = createNativeStackNavigator();
  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const dispatch = useAppDispatch();
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

    //INCOMES
    if (categoriesIncomes.length > 0) {
      //if jest po to żeby kod się nie  wysypał jak nie ma zdefiniowanych żadnych wydatków
      //Tak powinno być:

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
    if (currentMonth > currentMonthStore || currentYear > currentYearInStore) {
      dispatch(updateWeekExpenses());
      dispatch(updateMonthExpenses());
    }

    //TEST
    // if (new Date(dateCheck) > new Date(dateToUpdateWeek)) {
    //   dispatch(updateWeekExpenses());
    // }

    if (new Date() > new Date(dateToUpdateWeek)) {
      dispatch(updateWeekExpenses());
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
