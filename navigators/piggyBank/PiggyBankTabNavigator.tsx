import { Pressable } from "react-native";
import SettingsNavigator from "../SettingsNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SummaryScreen from "../../screens/SummaryScreen";
import COLORS_STYLE from "../../utils/styles/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MonthSummaryScreen from "../../screens/summary/MonthSummaryScreen";
import YearSummaryScreen from "../../screens/summary/YearSummaryScreen";
import YearsSummaryScreen from "../../screens/summary/YearsSummaryScreen";
import ActualTargetsScreen from "../../screens/piggyBank/ActualTargetsScreen";
import SavingsScreen from "../../screens/piggyBank/SavingsScreen";
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
        component={ActualTargetsScreen}
        name="actualTargets"
        options={{
          tabBarLabel: "Aktualne cele",
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
