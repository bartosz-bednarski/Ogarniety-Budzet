import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
const AddExpenseNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={AddExpenseScreen}
        name="addExpense"
        options={({ route, navigation }) => ({
          headerTintColor: "red",
          headerPressColor: "red",
          headerPressOpacity: 1,
          headerTitle: "Dodaj wydatek",
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
export default AddExpenseNavigator;
