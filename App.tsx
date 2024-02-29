import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { persistor, store } from "./redux/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PlanningNavigator from "./navigators/PlanningNavigator";
import SummaryNavigator from "./navigators/SummaryNavigator";
import ExpensesNavigator from "./navigators/ExpensesNavigator";
import IncomesNavigator from "./navigators/IncomesNavigator";
import PiggyBankNavigator from "./navigators/PiggyBankNavigator";
import COLORS_STYLE from "./utils/styles/colors";

export default function App() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = "black";
  const BottomTabs = createBottomTabNavigator();
  return (
    <>
      <StatusBar style="light" />

      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <NavigationContainer theme={navTheme}>
            <BottomTabs.Navigator
              screenOptions={({ route, navigation }) => ({
                headerShown: false,
                unmountOnBlur: true,
                tabBarActiveTintColor: COLORS_STYLE.basicGold,
                tabBarStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
              })}
            >
              <BottomTabs.Screen
                component={SummaryNavigator}
                name="Podsumowanie"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                  ),
                }}
              />
              <BottomTabs.Screen
                component={ExpensesNavigator}
                name="Wydatki"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="trending-down-outline"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
              <BottomTabs.Screen
                component={PlanningNavigator}
                name="Planowanie"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book" color={color} size={size} />
                  ),
                }}
              />
              <BottomTabs.Screen
                component={IncomesNavigator}
                name="Przychody"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="trending-up-outline"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
              <BottomTabs.Screen
                component={PiggyBankNavigator}
                name="Oszczędności"
                options={{
                  tabBarLabel: "Rachunki",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="wallet" color={color} size={size} />
                  ),
                }}
              />
            </BottomTabs.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}
