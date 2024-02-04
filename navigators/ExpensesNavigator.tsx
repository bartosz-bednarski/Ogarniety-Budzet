import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import ExpensesTabNavigator from "./expenses/ExpensesTabNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import AddExpenseScreen from "../screens/expenses/AddExpenseScreen";
import { useAppSelector } from "../redux/hooks";
const ExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
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
