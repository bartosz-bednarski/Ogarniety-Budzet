import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import ActualExpensesScreen from "../screens/expenses/ActualExpensesScreen";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const ActualExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ActualExpensesScreen}
        name="actualExpenses"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default ActualExpensesNavigator;
