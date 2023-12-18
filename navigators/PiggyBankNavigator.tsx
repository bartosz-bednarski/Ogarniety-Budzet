import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import PiggyBankScreen from "../screens/PiggyBankScreen";
import SettingsNavigator from "./SettingsNavigator";
const PiggyBankNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={PiggyBankScreen}
        name="piggyBank"
        options={({ route, navigation }) => ({
          headerTintColor: "red",
          headerPressColor: "red",
          headerPressOpacity: 1,
          headerTitle: "Skarbonka",
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
export default PiggyBankNavigator;
