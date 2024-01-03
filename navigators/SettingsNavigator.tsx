import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import EditExpensesCategoryScreen from "../screens/settings/expenses/EditExpensesCategoryScreen";
import AddNewExpensesCategoryScreen from "../screens/settings/expenses/AddNewExpensesCategoryScreen";
import COLORS_STYLE from "../utils/styles/colors";
import ExpensesCategoriesListScreen from "../screens/settings/expenses/ExpensesCategoriesListScreen";
import IncomesCategoriesListScreen from "../screens/settings/incomes/IncomesCategoriesListScreen";
import AddNewIncomesCategoryScreen from "../screens/settings/incomes/AddNewIncomesCategoryScreen";
import EditIncomesCategoryScreen from "../screens/settings/incomes/EditIncomesCategoryScreen";
const SettingsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
        headerTintColor: COLORS_STYLE.basicGold,
        headerPressColor: COLORS_STYLE.basicGold,
        headerPressOpacity: 1,
      })}
    >
      <Stack.Screen
        component={SettingsScreen}
        name="settings"
        options={{ headerTitle: "Opcje" }}
      />
      <Stack.Screen
        component={ExpensesCategoriesListScreen}
        name="editCategories"
        options={{ headerTitle: "Edytuj kategorie" }}
      />
      <Stack.Screen
        component={EditExpensesCategoryScreen}
        name="editCategory"
        options={({ route }) => {
          return { headerTitle: `Edytujesz ` };
        }}
      />
      <Stack.Screen
        component={AddNewExpensesCategoryScreen}
        name="addNewCategory"
        options={{ headerTitle: "Dodajesz nową kategorie" }}
      />
      <Stack.Screen
        component={IncomesCategoriesListScreen}
        name="incomesCategoriesList"
        options={{ headerTitle: "Dodajesz nową kategorie" }}
      />
      <Stack.Screen
        component={EditIncomesCategoryScreen}
        name="editIncomesCategory"
        options={({ route }) => {
          return { headerTitle: `Edytujesz ` };
        }}
      />
      <Stack.Screen
        component={AddNewIncomesCategoryScreen}
        name="addNewIncomesCategory"
        options={{ headerTitle: "Dodajesz nową kategorie" }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
