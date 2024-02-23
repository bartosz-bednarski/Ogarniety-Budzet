import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import PlanningTabNavigator from "./planning/PlanningTabNavigator";
import { useAppSelector } from "../redux/hooks";
import AddTargetScreen from "../screens/planning/AddTargetScreen";
const PlanningNavigator = () => {
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountName
  );
  const Stack = createNativeStackNavigator();

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
