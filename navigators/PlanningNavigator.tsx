import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { updateMonthIncomes } from "../redux/incomes-slice";
import {
  updateWeekExpenses,
  updateMonthExpenses,
} from "../redux/expenses-slice";
import { updateMonthBankAccounts } from "../redux/bankAccounts-slice";
import { setCurrentYearPiggyBank } from "../redux/piggyBank-slice";
import PlanningTabNavigator from "./planning/PlanningTabNavigator";
import AddTargetScreen from "../screens/planning/AddTargetScreen";

const PlanningNavigator = () => {
  //TEST
  // const dateCheck = "2025-03-15T08:06:22.626Z";
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountName
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);

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
        const sumOfMonthIncomes = categoriesIncomes.map((item) => ({
          bankAccountId: item.bankAccountId,
          sum: item.categories
            .map((cat) => Number(cat.value))
            .reduce((partialSum, a) => partialSum + a, 0),
        }));
        const sumOfMonthExpenses =
          categoriesExpenses.length > 0
            ? categoriesExpenses.map((item) => ({
                bankAccountId: item.bankAccountId,
                sum: item.categories
                  .map((cat) => Number(cat.sum))
                  .reduce((partialSum, a) => partialSum + a, 0),
              }))
            : 0;

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

          return {
            bankAccountId: item.bankAccountId,
            savings: item.sum - sumOfExpenses,
          };
        });

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
        component={PlanningTabNavigator}
        name="planning"
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
                  style={{
                    width: 48,
                    height: 48,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
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
        component={AddTargetScreen}
        name="addTarget"
        options={({ navigation }) => ({
          headerTintColor: COLORS_STYLE.basicGold,
          headerPressColor: COLORS_STYLE.basicGold,
          headerPressOpacity: 1,
          headerTitle: "Dodaj cel",
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
export default PlanningNavigator;
