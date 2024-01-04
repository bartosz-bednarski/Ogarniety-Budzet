import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActualExpensesNavigator from "../expenses/ActualExpensesNavigator";
import PlannedExpensesNavigator from "../expenses/PlannedExpensesNavigator";
import COLORS_STYLE from "../../utils/styles/colors";
import MonthIncomesNavigator from "./MonthIncomesNavigator";
import YearIncomesNavigator from "./YearIncomesNavigator";
import YearsIncomesNavigator from "./YearsIncomesNavigator";

const IncomesTabNavigator = () => {
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
        component={MonthIncomesNavigator}
        name="monthIncomesTab"
        options={{
          tabBarLabel: "Miesiąc",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 20,
          },
        }}
      />
      <Tab.Screen
        component={YearIncomesNavigator}
        name="yearIncomesTab"
        options={{
          tabBarLabel: "Rok",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 20,
          },
        }}
      />
      <Tab.Screen
        component={YearsIncomesNavigator}
        name="yearsIncomesTab"
        options={{
          tabBarLabel: "Lata",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default IncomesTabNavigator;
