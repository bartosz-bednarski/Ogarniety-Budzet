import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActualExpensesNavigator from "./ActualExpensesNavigator";
import PlannedExpensesNavigator from "./PlannedExpensesNavigator";
import COLORS_STYLE from "../utils/styles/colors";

const ExpensesTabNavigator = () => {
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
        component={ActualExpensesNavigator}
        name="actualExpensesTab"
        options={{
          tabBarLabel: "Rzeczywiste",
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
        component={PlannedExpensesNavigator}
        name="plannedExpensesTab"
        options={{
          tabBarLabel: "Zaplanowane",
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
export default ExpensesTabNavigator;
