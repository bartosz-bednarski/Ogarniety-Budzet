import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import SummaryTabNavigator from "./summary/SummaryTabNavigator";
import { useAppSelector } from "../redux/hooks";
const SummaryNavigator = () => {
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
        component={SummaryTabNavigator}
        name="summary"
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
        component={SettingsNavigator}
        name="settingsNavigator"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default SummaryNavigator;
