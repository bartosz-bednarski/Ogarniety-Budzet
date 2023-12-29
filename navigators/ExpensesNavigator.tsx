import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import ExpensesScreen from "../screens/expenses/ActualExpensesScreen";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExpensesTabNavigator from "./ExpensesTabNavigator";
import COLORS_STYLE from "../utils/styles/colors";
const ExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
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
        component={SettingsNavigator}
        name="settingsNavigator"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default ExpensesNavigator;
