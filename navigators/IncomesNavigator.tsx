import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import IncomesScreen from "../screens/IncomesScreen";
import SettingsNavigator from "./SettingsNavigator";
const IncomesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={IncomesScreen}
        name="incomes"
        options={({ route, navigation }) => ({
          headerTintColor: "red",
          headerPressColor: "red",
          headerPressOpacity: 1,
          headerTitle: "Przychody",
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
export default IncomesNavigator;
