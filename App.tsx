import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { persistor, store } from "./redux/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AddExpenseNavigator from "./navigators/AddExpenseNavigator";
import SummaryNavigator from "./navigators/SummaryNavigator";
import ExpensesNavigator from "./navigators/ExpensesNavigator";
import IncomesNavigator from "./navigators/IncomesNavigator";
import PiggyBankNavigator from "./navigators/PiggyBankNavigator";
export default function App() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = "white";
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
                component={AddExpenseNavigator}
                name="Dodaj wydatek"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="add-circle-outline"
                      color={color}
                      size={size}
                    />
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
                name="Skarbonka"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="gift" color={color} size={size} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
