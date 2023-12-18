import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import ExpensesScreen from "../screens/ExpensesScreen";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
const ExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ExpensesScreen}
        name="expenses"
        options={({ route, navigation }) => ({
          headerTintColor: "red",
          headerPressColor: "red",
          headerPressOpacity: 1,
          headerTitle: "Wydatki",
          headerRight: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate("settingsNavigator")}
              >
                <Ionicons
                  name="cog"
                  size={30}
                  color="red"
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
