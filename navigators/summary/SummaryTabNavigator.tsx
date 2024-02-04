import COLORS_STYLE from "../../utils/styles/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MonthSummaryScreen from "../../screens/summary/MonthSummaryScreen";
import YearSummaryScreen from "../../screens/summary/YearSummaryScreen";
import YearsSummaryScreen from "../../screens/summary/YearsSummaryScreen";
const SummaryTabNavigator = () => {
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
        component={MonthSummaryScreen}
        name="monthSummary"
        options={{
          tabBarLabel: "Miesiąc",
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
        component={YearSummaryScreen}
        name="yearSummary"
        options={{
          tabBarLabel: "Rok",
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
        component={YearsSummaryScreen}
        name="yearsSummary"
        options={{
          tabBarLabel: "Lata",
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
export default SummaryTabNavigator;
