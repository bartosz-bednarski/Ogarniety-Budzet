import COLORS_STYLE from "../../utils/styles/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SavingsScreen from "../../screens/piggyBank/SavingsScreen";
import ManageBankAccountsScreen from "../../screens/piggyBank/ManageBankAccountsScreen";
const PiggyBankTabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: COLORS_STYLE.basicGold },
        tabBarStyle: {
          elevation: 0,
          backgroundColor: COLORS_STYLE.backgroundBlack,
        },
      }}
    >
      <Tab.Screen
        component={SavingsScreen}
        name="account"
        options={{
          tabBarLabel: "Stan konta",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
        }}
      />
      <Tab.Screen
        component={ManageBankAccountsScreen}
        name="manageBankAccounts"
        options={{
          tabBarLabel: "Zarządzaj",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default PiggyBankTabNavigator;
