import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import COLORS_STYLE from "../../utils/styles/colors";
import MonthIncomesScreen from "../../screens/incomes/MonthIncomesScreen";
import YearIncomesScreen from "../../screens/incomes/YearIncomesScreen";
import YearsIncomesScreen from "../../screens/incomes/YearsIncomesScreen";

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
        component={MonthIncomesScreen}
        name="monthIncomes"
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
        component={YearIncomesScreen}
        name="yearIncomes"
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
        component={YearsIncomesScreen}
        name="yearsIncomes"
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
